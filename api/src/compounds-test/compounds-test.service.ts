import { Injectable } from '@nestjs/common';
import { CompoundService } from 'src/compound/compound.service';
import { CompoundTestDto } from './compound-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompoundsTest } from './compounds-test.entity';
import { Repository } from 'typeorm';
import { TestDetailService } from 'src/test-detail/test-detail.service';

@Injectable()
export class CompoundsTestService {
    constructor(
        @InjectRepository(CompoundsTest)
        private readonly compoundsTestRepository: Repository<CompoundsTest>,
        private readonly compoundService: CompoundService,
        private readonly testDetailService: TestDetailService
    ) {}

    async makeTests(tests: CompoundTestDto[]): Promise<CompoundTestDto[]> {
        const promises = tests.map((test) => this.makeUniqueTest(test));
        const result = await Promise.all(promises);
        this.saveTests(result);
        return result;
    }

    private async makeUniqueTest(test: CompoundTestDto): Promise<CompoundTestDto> {
        const compound = await this.compoundService.findOne(test.compoundId);

        if(test.amount < compound.min || test.amount > compound.max) {

            test.error = true;
            test.message = `Should be between ${compound.min} and ${compound.max}`;
            return test;

        } else {

            test.error = false;
            return test;

        }
    }

    private async saveTests(tests: CompoundTestDto[]) {
        const newTest = { testDate: new Date() };
        const savedTest = await this.compoundsTestRepository.save(newTest);
        this.testDetailService.saveDetails(savedTest, tests);
    }
}
