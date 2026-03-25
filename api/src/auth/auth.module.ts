import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';
import { Account } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Role]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET")
            })
        })
    ],
    providers: [AuthService, AccountService, RoleService],
    controllers: [AuthController]
})
export class AuthModule {}
