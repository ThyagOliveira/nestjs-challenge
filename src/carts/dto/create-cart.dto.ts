import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @Optional()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  totalQuantity: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: [{ price: 10, quantity: 1, productId: 123 }] })
  products: [];
}
