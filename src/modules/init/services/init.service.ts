import { Mark } from '@core/database/entities/mark.entity';
import { UserRepository } from '@modules/user/repositories/user.repositor';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initDto } from '../dto/init.dto';

@Injectable()
export class InitService {
  constructor(
    private readonly userRepo: UserRepository,
    @InjectRepository(Mark) private readonly markRepo: Repository<Mark>,
  ) {}

  /**
   * nitialisation des données losque l'on est connecté
   *
   * @param idUser
   * @returns
   */
  async init(idUser: number): Promise<initDto> {
    return {
      user: await this.userRepo.getById(idUser),
      marks: await this.markRepo.find(),
    } as initDto;
  }

  /**
   * Initialisation des données losque l'on est pas connecté
   *
   * @returns
   */
  async initPublic(): Promise<initDto> {
    return {
      user: null,
      marks: await this.markRepo.find(),
    } as initDto;
  }
}
