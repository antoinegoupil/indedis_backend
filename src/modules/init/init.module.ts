import { Mark } from '@core/database/entities/mark.entity';
import { UserRepository } from '@modules/user/repositories/user.repositor';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitController } from './init.controller';
import { InitService } from './services/init.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, Mark])],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
