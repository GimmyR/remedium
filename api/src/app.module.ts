import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AccountModule } from './account/account.module';
import { CompoundModule } from './compound/compound.module';
import { CompoundsTestModule } from './compounds-test/compounds-test.module';
import { TestDetailModule } from './test-detail/test-detail.module';
import path from 'path';
import { dataSourceOptions } from './config/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, '..', '..', '.env'),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => dataSourceOptions
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
