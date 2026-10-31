import { Module } from "@nestjs/common";
import { QuoteEnquiriesController } from "./quote-enquiries.controller";
import { QuoteEnquiriesService } from "./quote-enquiries.service";

@Module({
  controllers: [QuoteEnquiriesController],
  providers: [QuoteEnquiriesService],
})
export class QuoteEnquiriesModule {}