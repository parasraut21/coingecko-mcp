import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StderrLogger } from './stderr.logger';
import { AppConfigService } from './shared/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new StderrLogger()
  });
  
  app.useLogger(new StderrLogger());
  const configService = app.get(AppConfigService);
  // Enable CORS for NestJS - Add MYKEY to allowed headers
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Content-Type', 'Access-Control-Allow-Origin']
  });
  
  // Add error handling
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

  const port = configService.appPort; // Use typed getter with default
  await app.listen(port);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  
  // Keep the process alive
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server...');
    await app.close();
  });
  
  process.on('SIGINT', async () => {
    console.log('SIGINT received, closing server...');
    await app.close();
  });
}

bootstrap().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});