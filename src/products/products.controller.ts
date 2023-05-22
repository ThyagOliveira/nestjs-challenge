import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products Services')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
