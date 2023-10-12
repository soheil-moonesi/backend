import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
//This code snippet defines an asynchronous function called bootstrap.
// Inside the function, it creates an instance of the AppModule class using the NestFactory.create method.
// Then, it listens for incoming requests on port 3000 using the app.listen method.
