import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';
import { Vendor } from '@domain/item/vendor';

export class CreateItemDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsNumber() price: number;
  @ApiProperty({ enum: Vendor }) @IsEnum(Vendor) vendor: Vendor;
  @ApiProperty() @IsUrl() link: string;
}
