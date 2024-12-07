import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT ?? 5000;
  await app.listen(port, process.env.SERVER_HOST, () => {
    console.log(`started on ${port}`);
  });
}
bootstrap();
