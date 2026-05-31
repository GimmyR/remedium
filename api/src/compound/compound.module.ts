import { Module } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compound.entity';
import { CompoundController } from './compound.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Compound])],
    providers: [CompoundService, JwtService],
    controllers: [CompoundController],
})
export class CompoundModule {}
