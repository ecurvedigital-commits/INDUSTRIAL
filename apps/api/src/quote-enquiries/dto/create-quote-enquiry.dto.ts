import { Transform } from "class-transformer";
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

const sanitize = ({ value }: { value: unknown }) => {
  if (typeof value !== "string") return value;
  return Array.from(value.normalize("NFC"))
    .filter((char) => {
      const code = char.charCodeAt(0);
      return !(code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127);
    })
    .join("")
    .trim();
};

export class CreateQuoteEnquiryDto {
  @Transform(sanitize)
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  contactName!: string;

  @IsOptional()
  @Transform(sanitize)
  @IsString()
  @MaxLength(180)
  company?: string;

  @Transform(sanitize)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsOptional()
  @Transform(sanitize)
  @IsString()
  @Matches(/^[+0-9().\-\s]{6,40}$/)
  phone?: string;

  @Transform(sanitize)
  @IsString()
  @MinLength(10)
  @MaxLength(4000)
  message!: string;

  @IsOptional()
  @Transform(sanitize)
  @IsString()
  @MaxLength(180)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  productSlug?: string;
}
