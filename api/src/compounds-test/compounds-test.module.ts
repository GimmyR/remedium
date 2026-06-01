import { Module } from '@nestjs/common';
import { CompoundsTestController } from './compounds-test.controller';
import { CompoundService } from 'src/compound/compound.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from 'src/compound/compound.entity';
import { CompoundsTestService } from './compounds-test.service';
import { CompoundsTest } from './compounds-test.entity';
import { TestDetailService } from 'src/test-detail/test-detail.service';
import { TestDetail } from 'src/test-detail/test-detail.entity';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/account/account.entity';
import { Role } from 'src/role/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Compound, CompoundsTest, TestDetail, Account, Role])],
    controllers: [CompoundsTestController],
    providers: [CompoundService, CompoundsTestService, TestDetailService, JwtService],
})
export class CompoundsTestModule {}
