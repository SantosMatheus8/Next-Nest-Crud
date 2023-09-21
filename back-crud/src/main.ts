import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pelo domínio do seu aplicativo frontend
    credentials: false, // Se você estiver usando cookies ou autenticação, defina como true
  });

  const config = new DocumentBuilder()
    .setTitle('Next-API')
    .setDescription('API for a product crud')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 8080;
  app.listen(port, () => {
    setTimeout(() => {
      console.log(`Listening on port ${port}`);
      console.log(`swagger: http://localhost:${port}/api-docs`);
    }, 1000);
  });
}
bootstrap();
