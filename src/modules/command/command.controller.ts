import { Command } from '@core/database/entities/command.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@shared/decorators/user.decorator';
import { NewCommandDto } from './dto/new-command.dto';
import { CommandService } from './services/command.service';

@Controller('commands')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get()
  async getByUser(@User('id') idUser: number): Promise<Command[]> {
    return await this.commandService.getByUser(idUser);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Command> {
    return await this.commandService.getById(id);
  }

  @Post()
  async add(@Body() newCommandDto: NewCommandDto) {
    await this.commandService.add(newCommandDto);
  }
}
