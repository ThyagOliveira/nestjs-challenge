import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductCartDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123' })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  quantity: number;
}
