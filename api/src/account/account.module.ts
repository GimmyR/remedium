import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Role])],
    providers: [AccountService, RoleService, JwtService],
    controllers: [AccountController],
})
export class AccountModule {}
