import { Module } from '@nestjs/common';
import { CompoundsTestController } from './compounds-test.controller';
import { CompoundService } from 'src/compound/compound.service';
import { CompoundsTestService } from './compounds-test.service';
import { TestDetailService } from 'src/test-detail/test-detail.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [CompoundsTestController],
    providers: [CompoundService, CompoundsTestService, TestDetailService, JwtService],
})
export class CompoundsTestModule {}
