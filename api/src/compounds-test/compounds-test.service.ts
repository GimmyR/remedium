import { Injectable } from '@nestjs/common';
import { CompoundService } from 'src/compound/compound.service';
import { CompoundTestDto, CreateTest } from './compound-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompoundsTestService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly compoundService: CompoundService,
    ) {}

    async create(test: CreateTest) {
        test.compounds = await Promise.all(
            test.compounds.map(
                async (compoundTest) => await this.makeUniqueTest(compoundTest)
            )
        );

        await this.save(test);
        return test;
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

    private async save(test: CreateTest) {
        const { compounds, ...testWithoutCompounds } = test;

        return await this.prisma.compoundsTest.create({
            data: {
                ...testWithoutCompounds,
                testDate: new Date(),
                details: {
                    create: compounds.map((test) => ({
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
