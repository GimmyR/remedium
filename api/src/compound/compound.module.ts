import { Module } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { CompoundController } from './compound.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [CompoundService, JwtService],
    controllers: [CompoundController],
})
export class CompoundModule {}
