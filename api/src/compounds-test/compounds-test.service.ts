import { Injectable } from '@nestjs/common';
import { CompoundService } from 'src/compound/compound.service';
import { CompoundTestDto } from './compound-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompoundsTestService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly compoundService: CompoundService,
    ) {}

    async makeTests(tests: CompoundTestDto[]) {
        const promises = tests.map((test) => this.makeUniqueTest(test));
        const result = await Promise.all(promises);
        await this.saveTests(result);
        return result;
    }

    private async makeUniqueTest(test: CompoundTestDto) {
        const compound = await this.compoundService.findOne(test.compoundId);

        if (
            (compound.min != undefined && test.amount < compound.min) ||
            (compound.max != undefined && test.amount > compound.max)
        ) {
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
        return await this.prisma.compoundsTest.create({
            data: {
                ...newTest,
                details: {
                    create: tests.map((test) => ({
                        compoundId: test.compoundId,
                        amount: test.amount,
                    })),
                },
            },
        });
    }

    async findAll() {
        return await this.prisma.compoundsTest.findMany({
            orderBy: {
                testDate: 'asc',
            },
            include: {
                details: {
                    include: {
                        compound: true,
                    },
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
        });
    }
}
