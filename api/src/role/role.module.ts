import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [RoleService, JwtService],
})
export class RoleModule {}
