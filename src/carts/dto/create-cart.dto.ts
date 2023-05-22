import { Optional } from '@nestjs/common';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @Optional()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @IsArray()
  @IsNotEmpty()
  products: [];
}
