import { User } from '@core/database/entities/user.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@shared/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Inscription
   *
   * @param user
   * @returns
   */
  @Public()
  @Post('register')
  async register(@Body() user: User) {
    await this.authService.register(user);
  }

  /**
   * Connexion
   *
   * @param loginDto
   * @returns
   */
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
