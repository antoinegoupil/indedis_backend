import { Controller, Get, Query } from '@nestjs/common';
import { ProductFilterDto } from './dto/prodult-filter.dto';
import { ProductService } from './services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() productFilter: ProductFilterDto) {
    console.log(productFilter);
    return this.productService.getProducts(productFilter);
  }
}
