import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@shared/config/database.config';
import jwtConfig from '@shared/config/jwt.config';
import serverConfig from '@shared/config/server.config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, serverConfig, jwtConfig] }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => configService.get<JwtModuleOptions>('jwt'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('database'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    JwtStrategy,
  ],
  exports: [JwtModule],
})
export class CoreModule {}
