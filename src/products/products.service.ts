import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3001/services/products').pipe(
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
      this.httpService
        .get(`http://localhost:3001/services/products/${id}`)
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
