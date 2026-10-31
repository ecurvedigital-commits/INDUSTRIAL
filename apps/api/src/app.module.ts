import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { QuoteEnquiriesModule } from "./quote-enquiries/quote-enquiries.module";

@Module({
  imports: [PrismaModule, ProductsModule, CategoriesModule, QuoteEnquiriesModule],
  controllers: [AppController],
})
export class AppModule {}