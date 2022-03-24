import { Command } from '@core/database/entities/command.entity';
import { Injectable } from '@nestjs/common';
import { CommandRepository } from '../repositories/command.repository';

@Injectable()
export class CommandService {
  constructor(private readonly commandRepo: CommandRepository) {}

  /**
   * Liste des commande d'un utilisateur
   *
   * @param idUser
   * @returns
   */
  async getByUser(idUser: number): Promise<Command[]> {
    return await this.commandRepo.finByUser(idUser);
  }

  /**
   * Détail d'une commande
   *
   * @param id
   * @returns
   */
  async getById(id: number): Promise<Command> {
    return await this.commandRepo.findById(id);
  }
}
