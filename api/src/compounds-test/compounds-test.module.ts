import { Module } from '@nestjs/common';
import { CompoundsTestController } from './compounds-test.controller';
import { CompoundService } from 'src/compound/compound.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from 'src/compound/compound.entity';
import { CompoundsTestService } from './compounds-test.service';
import { CompoundsTest } from './compounds-test.entity';
import { TestDetailService } from 'src/test-detail/test-detail.service';
import { TestDetail } from 'src/test-detail/test-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compound, CompoundsTest, TestDetail])],
  controllers: [CompoundsTestController],
  providers: [CompoundService, CompoundsTestService, TestDetailService],
})
export class CompoundsTestModule {}
