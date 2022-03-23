import { UserRepository } from '@modules/user/repositories/user.repositor';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
