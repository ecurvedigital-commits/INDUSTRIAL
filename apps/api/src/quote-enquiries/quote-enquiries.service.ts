import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ProductStatus, QuoteEnquiryStatus } from "@prisma/client";
import type { CreateQuoteEnquiryRequest, QuoteEnquiryReceipt } from "@raj/shared";
import { throwIfDatabaseUnavailable } from "../common/database-error";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class QuoteEnquiriesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(input: CreateQuoteEnquiryRequest): Promise<QuoteEnquiryReceipt> {
    try {
      let productId: string | null = null;

      if (input.productSlug) {
        const product = await this.prisma.product.findFirst({
          where: { slug: input.productSlug, status: ProductStatus.PUBLISHED },
          select: { id: true },
        });
        if (!product) throw new BadRequestException("The selected product is unavailable.");
        productId = product.id;
      }

      const enquiry = await this.prisma.quoteEnquiry.create({
        data: {
          contactName: input.contactName,
          company: input.company || null,
          email: input.email,
          phone: input.phone || null,
          message: input.message,
          productId,
        },
        select: { id: true, status: true, createdAt: true },
      });

      return {
        id: enquiry.id,
        status: enquiry.status as QuoteEnquiryStatus,
        createdAt: enquiry.createdAt.toISOString(),
      };
    } catch (error) {
      throwIfDatabaseUnavailable(error);
      throw error;
    }
  }
}