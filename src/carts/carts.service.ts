import { Injectable, Logger } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);

  constructor(private readonly httpService: HttpService) {}

  async create(createCartDto: CreateCartDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .post('http://localhost:3002/services/carts', createCartDto)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3002/services/carts').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async findOne(id: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/services/carts/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .patch(`http://localhost:3002/services/carts/${id}`, updateCartDto)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async remove(id: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .delete(`http://localhost:3002/services/carts/${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
