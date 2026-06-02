import { Module } from '@nestjs/common';
import { TestDetailService } from './test-detail.service';
import { CompoundService } from 'src/compound/compound.service';

@Module({
    providers: [TestDetailService, CompoundService],
})
export class TestDetailModule {}
