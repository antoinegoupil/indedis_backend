import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  () =>
    ({
      privateKey: process.env._JWT_PRIVATE_KEY,
      publicKey: process.env._JWT_PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
      },
    } as JwtModuleOptions),
);
