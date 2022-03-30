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
    const req = this.createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.description', 'product.price', 'product.imageName'])
      .where('1');

    if (productFilter.name) {
      req.andWhere('product.name LIKE :name', { name: `%${productFilter.name.trim()}%` });
    }

    if (productFilter.mark) {
      req.andWhere('product.mark = :mark', { mark: productFilter.mark });
    }

    return await req.getMany();
  }

  /**
   * Récupère un id par son id
   *
   * @param id
   * @returns
   */
  async findById(id: number) {
    return await this.createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.description', 'product.price', 'product.imageName'])
      .where('product.id = :id', { id })
      .getOne();
  }

  async findForHome(): Promise<Product[]> {
    return await this.createQueryBuilder('product')
      .select(['product.id', 'product.name', 'product.description', 'product.price', 'product.imageName'])
      .where('product.isHome = true')
      .getMany();
  }
}
