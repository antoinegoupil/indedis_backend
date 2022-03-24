import { Command } from '@core/database/entities/command.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@shared/decorators/user.decorator';
import { CommandService } from './services/command.service';

@Controller('commands')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get()
  async getByUser(@User('id') idUser: number): Promise<Command[]> {
    return await this.commandService.getByUser(idUser);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.commandService.getById(id);
  }
}
