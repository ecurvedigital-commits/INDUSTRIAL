import { Body, Controller, Inject, Post } from "@nestjs/common";
import type { QuoteEnquiryReceipt } from "@raj/shared";
import { CreateQuoteEnquiryDto } from "./dto/create-quote-enquiry.dto";
import { QuoteEnquiriesService } from "./quote-enquiries.service";

@Controller("quote-enquiries")
export class QuoteEnquiriesController {
  constructor(@Inject(QuoteEnquiriesService) private readonly enquiries: QuoteEnquiriesService) {}

  @Post()
  create(@Body() body: CreateQuoteEnquiryDto): Promise<QuoteEnquiryReceipt> {
    return this.enquiries.create(body);
  }
}