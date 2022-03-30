import { Controller, Get } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { HomeDto } from './dto/home.dto';
import { HomeService } from './services/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Public()
  @Get()
  async home(): Promise<HomeDto> {
    return this.homeService.home();
  }
}
