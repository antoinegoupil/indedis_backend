import { Injectable } from '@nestjs/common';
import { ProductFilterDto } from '../dto/prodult-filter.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  /**
   * Liste des produits selon les filtres
   *
   * @param productFilter
   * @returns
   */
  async getProducts(productFilter: ProductFilterDto) {
    return await this.productRepo.findByFilter(productFilter);
  }

  async getById(id: number) {
    return await this.productRepo.findById(id);
  }
}
