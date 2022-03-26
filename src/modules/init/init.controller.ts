import { Controller, Get } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { User } from '@shared/decorators/user.decorator';
import { initDto } from './dto/init.dto';
import { InitService } from './services/init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Get()
  async init(@User('id') idUser: number): Promise<initDto> {
    return await this.initService.init(idUser);
  }

  @Public()
  @Get('public')
  async initPublic(): Promise<initDto> {
    return await this.initService.initPublic();
  }
}
