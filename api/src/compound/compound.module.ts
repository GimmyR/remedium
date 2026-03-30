import { Module } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compound.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compound])
  ],
  providers: [CompoundService]
})
export class CompoundModule {}
