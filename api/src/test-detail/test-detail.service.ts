import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestDetail } from './test-detail.entity';
import { Repository } from 'typeorm';
import { CompoundsTest } from 'src/compounds-test/compounds-test.entity';
import { CompoundTestDto } from 'src/compounds-test/compound-test.dto';
import { CompoundService } from 'src/compound/compound.service';

@Injectable()
export class TestDetailService {
    constructor(
        @InjectRepository(TestDetail)
        private readonly testDetailRepository: Repository<TestDetail>,
        private readonly compoundService: CompoundService,
    ) {}

    async saveDetails(test: CompoundsTest, details: CompoundTestDto[]) {
        for (const detail of details) {
            await this.testDetailRepository.save({
                test: test,
                compound: await this.compoundService.findOne(detail.compoundId),
                amount: detail.amount,
            });
        }
    }
}
