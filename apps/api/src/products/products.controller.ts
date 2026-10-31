import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductQueryDto } from "./dto/product-query.dto";

@Controller("products")
export class ProductsController {
  constructor(@Inject(ProductsService) private readonly products: ProductsService) {}

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.products.findAll(query);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.products.findBySlug(slug);
  }
}