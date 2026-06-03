import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';

@Module({
    providers: [AccountService, RoleService, JwtService],
    controllers: [AccountController],
})
export class AccountModule {}
