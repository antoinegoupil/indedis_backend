import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandController } from './command.controller';
import { CommandRepository } from './repositories/command.repository';
import { CommandService } from './services/command.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommandRepository])],
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
