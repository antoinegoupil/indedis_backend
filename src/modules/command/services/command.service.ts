import { Address } from '@core/database/entities/address.entity';
import { CommandProduct } from '@core/database/entities/command-product.entity';
import { Command } from '@core/database/entities/command.entity';
import { Product } from '@core/database/entities/product.entity';
import { User } from '@core/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { NewCommandDto } from '../dto/new-command.dto';
import { CommandRepository } from '../repositories/command.repository';

@Injectable()
export class CommandService {
  constructor(private readonly commandRepo: CommandRepository, private readonly connection: Connection) {}

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

  async add(newCommandDto: NewCommandDto) {
    await this.connection.transaction(async (manager) => {
      const command = new Command({
        date: newCommandDto.date,
        time: newCommandDto.time,
        price: newCommandDto.price,
        user: new User(newCommandDto.user) || null,
        address: new Address(newCommandDto.address),
      });

      const newcommand = await manager.getRepository(Command).save(command);

      for (const product of newCommandDto.products) {
        const commandProduct = new CommandProduct({
          amount: product.amount,
          command: newcommand,
          product: new Product({ id: product.id }),
        });

        await manager.getRepository(CommandProduct).save(commandProduct);
      }
    });
  }
}
