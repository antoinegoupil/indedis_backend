import { Mark } from '@core/database/entities/mark.entity';
import { User } from '@core/database/entities/user.entity';

export class initDto {
  user: User;
  marks: Mark[];
}
