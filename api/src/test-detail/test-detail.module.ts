import { Module } from '@nestjs/common';
import { TestDetailService } from './test-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDetail } from './test-detail.entity';
import { CompoundService } from 'src/compound/compound.service';
import { Compound } from 'src/compound/compound.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestDetail, Compound])],
  providers: [TestDetailService, CompoundService]
})
export class TestDetailModule {}
