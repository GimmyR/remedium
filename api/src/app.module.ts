import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AccountModule } from './account/account.module';
import { CompoundModule } from './compound/compound.module';
import { CompoundsTestModule } from './compounds-test/compounds-test.module';
import { TestDetailModule } from './test-detail/test-detail.module';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // disable on production
      }),
    }),
    AccountModule,
    AuthModule,
    RoleModule,
    CompoundModule,
    CompoundsTestModule,
    TestDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
