import { ProductRepository } from '@modules/product/repositories/product.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeService } from './services/home.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
