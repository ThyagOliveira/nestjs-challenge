import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemoveProductCartDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123' })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  quantity: number;
}
