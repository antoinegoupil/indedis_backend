import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CommandModule } from './modules/command/command.module';
import { InitModule } from './modules/init/init.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [CoreModule, AuthModule, UserModule, ProductModule, CommandModule, InitModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
