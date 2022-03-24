import { Product } from '@core/database/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductFilterDto } from '../dto/prodult-filter.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  /**
   * Récupère la liste des produits selon les filtres
   *
   * @param productFilter
   * @returns
   */
  async findByFilter(productFilter: ProductFilterDto): Promise<Product[]> {
    const req = this.createQueryBuilder('product').select(['product.id', 'product.name', 'product.price']).where('1');

    if (productFilter.name) {
      req.andWhere('product.name LIKE :name', { name: `%${productFilter.name.trim()}%` });
    }

    if (productFilter.mark) {
      req.andWhere('product.mark = :mark', { mark: productFilter.mark });
    }

    return req.getMany();
  }
}
