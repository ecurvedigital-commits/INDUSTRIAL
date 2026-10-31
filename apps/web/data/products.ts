export type ProductSupplyType = "MANUFACTURED" | "DISTRIBUTED" | "CUSTOM";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpecification = {
  name: string;
  value: string;
};

export type ProductDocument = {
  name: string;
  href: string;
  type: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  isPlaceholder: boolean;
};

export type CatalogProduct = {
  name: string;
  slug: string;
  sku: string;
  supplyType?: ProductSupplyType;
  summary: string;
  description: string;
  categoryId: string;
  categoryName: string;
  specifications?: ProductSpecification[];
  images: ProductImage[];
  documents?: ProductDocument[];
  isPlaceholder: boolean;
};

export const productCategories: ProductCategory[] = [
  { id: "category-01", name: "Category placeholder 01", isPlaceholder: true },
  { id: "category-02", name: "Category placeholder 02", isPlaceholder: true },
  { id: "category-03", name: "Category placeholder 03", isPlaceholder: true },
];

const PLACEHOLDER_PRODUCT_COUNT = 60;

const illustrativeImages: ProductImage[][] = [
  [
    {
      src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
      alt: "Illustrative metal fabrication work; not a verified RAJ product.",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85",
      alt: "Illustrative engineering workstation; not a verified RAJ product.",
    },
  ],
  [
    {
      src: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1200&q=85",
      alt: "Illustrative automated production line; not a verified RAJ product.",
    },
  ],
];

export const placeholderProducts: CatalogProduct[] = Array.from(
  { length: PLACEHOLDER_PRODUCT_COUNT },
  (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const category = productCategories[index % productCategories.length];

    return {
      name: `Illustrative product placeholder ${number}`,
      slug: `product-placeholder-${number}`,
      sku: `SKU-PENDING-${number}`,
      summary: "Illustrative reference only; not verified RAJ inventory.",
      description:
        "This entry is a design placeholder. Product details, availability, and supply type have not been confirmed by RAJ.",
      categoryId: category.id,
      categoryName: category.name,
      images: illustrativeImages[index % illustrativeImages.length],
      isPlaceholder: true,
    };
  },
);