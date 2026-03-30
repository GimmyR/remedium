import { Injectable } from '@nestjs/common';
import { CompoundService } from 'src/compound/compound.service';
import { CompoundTestDto } from './compound-test.dto';

@Injectable()
export class CompoundsTestService {
    constructor(private readonly compoundService: CompoundService) {}

    async makeTests(tests: CompoundTestDto[]): Promise<CompoundTestDto[]> {
        const promises = tests.map((test) => this.makeUniqueTest(test));
        const result = await Promise.all(promises);
        return result;
    }

    private async makeUniqueTest(test: CompoundTestDto): Promise<CompoundTestDto> {
        const compound = await this.compoundService.findOne(test.compoundId);

        if(test.amount < compound.min || test.amount > compound.max) {

            test.error = true;
            test.message = `Amount of ${compound.title} should be between ${compound.min} and ${compound.max} !`;
            return test;

        } else {

            test.error = false;
            return test;

        }
    }
}
