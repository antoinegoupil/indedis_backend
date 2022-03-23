import { User } from '@core/database/entities/user.entity';
import { UserRepository } from '@modules/user/repositories/user.repositor';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CODE_ERROR, CODE_ERROR_MYSQL } from '@shared/constants/error.constant';
import { FunctionalException } from '@shared/exception/functional.exception';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from '../dto/token.dto';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Inscription d'un utilisateur
   *
   * @param user
   */
  async register(user: User) {
    try {
      user.password = await this.saltPassword(user.password);
      await this.userRepo.insert(user);
    } catch (error) {
      if (error.code === CODE_ERROR_MYSQL.DUP_ENTRY) {
        throw new FunctionalException(CODE_ERROR.DUP_EMAIL);
      }

      throw error;
    }
  }

  /**
   * Connexion d'un token utilisateur
   *
   * @param params
   * @returns
   */
  async login(params: LoginDto) {
    const user = await this.authRepo.login(params.email);

    if (user && this.validatePasswordUser(params.password, user.password)) {
      return this.generateToken(user.id);
    }

    throw new UnauthorizedException(CODE_ERROR.AUTH_FAILLED);
  }

  /**
   * Hash un mot de passe
   *
   * @param password
   * @returns
   */
  private async saltPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Vérifie si le mot de passe d'un utilisateur est valide
   *
   * @param passwordlogin
   * @param passwordUser
   * @returns
   */
  validatePasswordUser(passwordlogin: string, passwordUser: string): boolean {
    if (bcrypt.compare(passwordlogin, passwordUser)) {
      return true;
    }
    return false;
  }

  /**
   * Génère un token jwt
   *
   * @param userId
   * @returns un token jwt
   */
  generateToken(userId: number): TokenDto {
    return { token: this.jwtService.sign({ id: userId }) };
  }
}
