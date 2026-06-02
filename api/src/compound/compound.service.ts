import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SaveCompoundRequest, UpdateActiveRequest } from './compound.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompoundService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(id: number) {
        const compound = await this.prisma.compound.findUnique({
            where: {
                id: typeof id === 'string' ? parseInt(id) : id,
            },
        });

        if (!compound) throw new NotFoundException('Compound not found');

        return compound;
    }

    async findAll() {
        return await this.prisma.compound.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }

    async create(compound: SaveCompoundRequest) {
        if (compound.min != undefined && compound.max != undefined && compound.min >= compound.max)
            throw new BadRequestException('Min should be lower than max');

        return await this.prisma.compound.create({
            data: { ...compound, active: true },
        });
    }

    async update(compound: SaveCompoundRequest) {
        if (compound.min != undefined && compound.max != undefined && compound.min >= compound.max)
            throw new BadRequestException('Min should be lower than max');

        return await this.prisma.compound.update({
            where: { id: compound.id },
            data: { ...compound },
        });
    }

    async partiallyUpdate(compound: UpdateActiveRequest) {
        return await this.prisma.compound.update({
            where: {
                id: compound.id,
            },
            data: {
                active: compound.active,
            },
        });
    }

    async remove(id: number) {
        return await this.prisma.compound.delete({
            where: {
                id: typeof id === 'string' ? parseInt(id) : id,
            },
        });
    }
}
