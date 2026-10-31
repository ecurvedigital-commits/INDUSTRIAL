export interface HealthResponse {
  status: "ok";
}

export type ProductSupplyType = "MANUFACTURED" | "DISTRIBUTED" | "CUSTOM";

export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type QuoteEnquiryStatus = "NEW" | "REVIEWING" | "QUOTED" | "CLOSED";

export interface ProductCategorySummary {
  id: string;
  name: string;
  slug: string;
}

export interface ProductSpecificationRecord {
  id: string;
  name: string;
  value: string;
  sortOrder: number;
}

export interface ProductImageReference {
  src: string;
  alt: string;
}

export interface ProductDocumentReference {
  name: string;
  href: string;
  type: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  sku: string;
  summary: string;
  description: string;
  supplyType: ProductSupplyType;
  status: ProductStatus;
  category: ProductCategorySummary;
  specifications: ProductSpecificationRecord[];
  images: ProductImageReference[];
  documents: ProductDocumentReference[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  items: ProductRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface CreateQuoteEnquiryRequest {
  contactName: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  productSlug?: string;
}

export interface QuoteEnquiryReceipt {
  id: string;
  status: QuoteEnquiryStatus;
  createdAt: string;
}