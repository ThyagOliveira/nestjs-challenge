import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
