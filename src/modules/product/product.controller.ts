import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { ProductFilterDto } from './dto/prodult-filter.dto';
import { ProductService } from './services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Liste des produits filtré
   *
   * @param productFilter
   * @returns
   */
  @Public()
  @Get()
  async getProducts(@Query() productFilter: ProductFilterDto) {
    return this.productService.getProducts(productFilter);
  }

  /**
   * Un produit par son id
   *
   * @param id
   * @returns
   */
  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getById(id);
  }
}
