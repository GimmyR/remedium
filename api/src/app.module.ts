import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AccountModule } from './account/account.module';
import { CompoundModule } from './compound/compound.module';
import { CompoundsTestModule } from './compounds-test/compounds-test.module';
import { TestDetailModule } from './test-detail/test-detail.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AccountModule,
        AuthModule,
        RoleModule,
        CompoundModule,
        CompoundsTestModule,
        TestDetailModule,
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
