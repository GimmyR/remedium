import { Module } from '@nestjs/common';
import { CompoundsTestController } from './compounds-test.controller';
import { CompoundService } from 'src/compound/compound.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from 'src/compound/compound.entity';
import { CompoundsTestService } from './compounds-test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compound])
  ],
  controllers: [CompoundsTestController],
  providers: [CompoundService, CompoundsTestService]
})
export class CompoundsTestModule {}
