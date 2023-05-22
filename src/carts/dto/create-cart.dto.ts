import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
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
