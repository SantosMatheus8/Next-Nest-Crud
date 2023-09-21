import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Category' })
  category: string;

  @ApiProperty({ description: 'Price' })
  price: number;
}
