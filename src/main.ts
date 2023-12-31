import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
//import validationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //The pipe is responsible for validating incoming requests and ensuring that only whitelisted properties are allowed.
  await app.listen(3000);
}
bootstrap();
//This code snippet defines an asynchronous function called bootstrap.
// Inside the function, it creates an instance of the AppModule class using the NestFactory.create method.
// Then, it listens for incoming requests on port 3000 using the app.listen method.
