import { Product } from '@core/database/entities/product.entity';

export class HomeDto {
  readonly products: Product[];
}
