import { ProductRepository } from '@modules/product/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { HomeDto } from '../dto/home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly productRepo: ProductRepository) {}

  async home(): Promise<HomeDto> {
    return {
      products: await this.productRepo.findForHome(),
    } as HomeDto;
  }
}
