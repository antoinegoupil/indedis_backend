import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  () =>
    ({
      type: 'mysql',
      host: process.env._DB_HOST,
      port: parseInt(process.env._DB_PORT, 10) || 3306,
      username: process.env._DB_USER,
      password: process.env._DB_PASSWORD,
      database: process.env._DB_DATABASE,
      entities: [process.env._DB_ENTITIES],
      logging: process.env._DB_LOGGING || false,
    } as TypeOrmModuleOptions),
);
