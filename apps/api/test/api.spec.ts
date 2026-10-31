import "reflect-metadata";
import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Prisma } from "@prisma/client";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

const productRow = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Published test product",
  slug: "published-test-product",
  sku: "TEST-001",
  summary: "Test summary",
  description: "Test description",
  supplyType: "DISTRIBUTED",
  status: "PUBLISHED",
  categoryId: "00000000-0000-4000-8000-000000000002",
  images: [{ src: "https://example.test/image.jpg", alt: "Test image" }],
  documents: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-02T00:00:00.000Z"),
  category: {
    id: "00000000-0000-4000-8000-000000000002",
    name: "Test category",
    slug: "test-category",
  },
  specifications: [],
};

let failProductQuery = false;
let findManyArgs: Record<string, unknown> | undefined;
let quoteCreateArgs: Record<string, unknown> | undefined;

const prismaMock = {
  product: {
    findMany: async (args: Record<string, unknown>) => {
      findManyArgs = args;
      if (failProductQuery) {
        throw new Prisma.PrismaClientKnownRequestError("connection unavailable", {
          code: "P1001",
          clientVersion: "6.19.3",
        });
      }
      return [productRow];
    },
    count: async () => 21,
    findFirst: async () => productRow,
  },
  category: {
    findMany: async () => [
      {
        id: productRow.category.id,
        name: productRow.category.name,
        slug: productRow.category.slug,
        description: null,
      },
    ],
  },
  quoteEnquiry: {
    create: async (args: Record<string, unknown>) => {
      quoteCreateArgs = args;
      return {
        id: "00000000-0000-4000-8000-000000000003",
        status: "NEW",
        createdAt: new Date("2026-01-03T00:00:00.000Z"),
      };
    },
  },
  $transaction: async (operations: Promise<unknown>[]) => Promise.all(operations),
};

describe("public API", () => {
  let app: INestApplication;

  before(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  it("returns the existing health response without database access", async () => {
    const response = await request(app.getHttpServer()).get("/health").expect(200);
    assert.deepEqual(response.body, { status: "ok" });
  });

  it("validates and applies product pagination and filters", async () => {
    const response = await request(app.getHttpServer())
      .get("/products")
      .query({ page: 2, limit: 10, search: "test", sku: "001", category: "test-category" })
      .expect(200);

    assert.equal(response.body.pagination.page, 2);
    assert.equal(response.body.pagination.limit, 10);
    assert.equal(response.body.pagination.total, 21);
    assert.equal(response.body.items[0].sku, "TEST-001");
    assert.equal(response.body.items[0].images[0].alt, "Test image");
    assert.equal(findManyArgs?.skip, 10);
    assert.equal(findManyArgs?.take, 10);
    assert.equal(await request(app.getHttpServer()).get("/products?limit=101").expect(400).then(() => true), true);
  });

  it("returns active categories", async () => {
    const response = await request(app.getHttpServer()).get("/categories").expect(200);
    assert.equal(response.body[0].slug, "test-category");
  });

  it("rejects invalid quote enquiries and unexpected properties", async () => {
    await request(app.getHttpServer())
      .post("/quote-enquiries")
      .send({ contactName: "A", email: "not-an-email", message: "short", internal: "no" })
      .expect(400);
    assert.equal(quoteCreateArgs, undefined);
  });

  it("creates a validated quote enquiry with an optional published product", async () => {
    const response = await request(app.getHttpServer())
      .post("/quote-enquiries")
      .send({
        contactName: "Alex Customer",
        company: "Example Company",
        email: "alex@example.com",
        phone: "+1 555 0100",
        message: "Please provide a quotation for the published test product.",
        productSlug: "published-test-product",
      })
      .expect(201);

    assert.equal(response.body.status, "NEW");
    assert.equal(
      (quoteCreateArgs?.data as { productId?: string }).productId,
      productRow.id,
    );
  });

  it("returns a generic 503 when database access is unavailable", async () => {
    failProductQuery = true;
    const response = await request(app.getHttpServer()).get("/products").expect(503);
    failProductQuery = false;

    assert.deepEqual(response.body.message, "Database service is unavailable.");
    assert.equal(JSON.stringify(response.body).includes("connection unavailable"), false);
  });
});