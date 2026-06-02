import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import path from 'path';
import { AppModule } from 'src/app.module';

export async function setupTestEnvironment() {
    const container = await new PostgreSqlContainer('postgres:15-alpine').start();
    const databaseUrl = container.getConnectionUri();
    const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
    execSync(`npx prisma db push --schema=${schemaPath} --accept-data-loss --url="${databaseUrl}"`, {
        stdio: 'pipe',
    });

    process.env.DATABASE_URL = databaseUrl;
    process.env.JWT_SECRET = 'loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx';
    process.env.PASSWORD_STRENGTH = '12';
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_PASSWORD = 'pwdAdmin';

    const module: TestingModule = await Test.createTestingModule({
        imports: [
            AppModule,
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    global: true,
                    secret: configService.get<string>('JWT_SECRET'),
                }),
            }),
        ],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    return { app, container };
}
