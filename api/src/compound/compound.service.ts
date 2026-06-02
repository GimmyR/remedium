import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SaveCompoundRequest, UpdateActiveRequest } from './compound.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompoundService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findOne(id: number) {
        const compound = await this.prisma.compound.findUnique({
            where: {
                id: id
            }
        });

        if (!compound) throw new NotFoundException('Compound not found');

        return compound;
    }

    async findAll() {
        return await this.prisma.compound.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    async save(compound: SaveCompoundRequest) {
        if (compound.min != undefined && compound.max != undefined && compound.min >= compound.max)
            throw new BadRequestException('Min should be lower than max');

        const { id, ...toSave } = compound;

        if(id)
            return await this.prisma.compound.update({
                where: { id: id },
                data: { ...compound }
            });

        else return await this.prisma.compound.create({
            data: { ...toSave, active: true }
        });
    }

    async update(compound: UpdateActiveRequest) {
        return await this.prisma.compound.update({
            where: {
                id: compound.id
            },
            data: {
                active: compound.active
            }
        });
    }

    async remove(id: number) {
        return await this.prisma.compound.delete({
            where: {
                id: id
            }
        });
    }
}
