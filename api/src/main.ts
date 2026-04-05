import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    
    const config = new DocumentBuilder()
        .setTitle("Remedium API docs")
        .setDescription("Remedium API docs made with Swagger UI")
        .setVersion("1.0")
        .addTag("user")
        .addTag("role")
        .addTag("auth")
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "JWT",
            description: "Paste your JWT token",
            in: "header"
        }, "access-token")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
