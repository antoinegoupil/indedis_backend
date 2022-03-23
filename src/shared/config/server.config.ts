import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: parseInt(process.env._SERVER_PORT, 10) || 4000,
  apiDoc: process.env._SERVER_API_DOC === 'true',
}));
