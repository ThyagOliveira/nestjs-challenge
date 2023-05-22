import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddProductCartDto } from './dto/add-product-cart.dto';
import { RemoveProductCartDto } from './dto/remove-product-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Carts Services')
@Controller('api/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Req() request: Request, @Body() createCartDto: CreateCartDto) {
    createCartDto.userId = request['user']['id'].toString();
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Patch('/add/product/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addProduct(
    @Param('id') id: string,
    @Body() addProductCartDto: AddProductCartDto,
  ) {
    const cart = await this.findOne(id);

    if (!cart) {
      throw new NotFoundException(`Cart ${id} not found`);
    }

    let updated = false;

    cart.products.map((item) => {
      if (item.productId === addProductCartDto.productId) {
        item.quantity += addProductCartDto.quantity;
        updated = true;
      }
    });

    if (!updated) {
      cart['products'].push({
        price: addProductCartDto.price,
        quantity: addProductCartDto.quantity,
        productId: addProductCartDto.productId,
      });
    }

    return this.cartsService.update(id, cart);
  }

  @Patch('/remove/product/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async removeProduct(
    @Param('id') id: string,
    @Body() removeProductCartDto: RemoveProductCartDto,
  ) {
    const cart = await this.findOne(id);

    if (!cart) {
      throw new NotFoundException(`Cart ${id} not found`);
    }

    const updatedProducts = [];

    for (let index = 0; index < cart.products.length; index++) {
      const item = cart.products[index];

      if (item.productId === removeProductCartDto.productId) {
        if (item.quantity > removeProductCartDto.quantity) {
          item.quantity -= removeProductCartDto.quantity;
          updatedProducts.push(item);
        }
      } else {
        updatedProducts.push(item);
      }
    }
    cart.products = updatedProducts;

    return this.cartsService.update(id, cart);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
