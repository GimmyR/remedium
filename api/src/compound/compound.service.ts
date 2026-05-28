import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compound } from './compound.entity';
import { Repository } from 'typeorm';
import { SaveCompoundRequest, UpdateActiveRequest } from './compound.dto';

@Injectable()
export class CompoundService {
    constructor(
        @InjectRepository(Compound)
        private readonly compoundRepository: Repository<Compound>,
    ) {}

    async findOne(id: number): Promise<Compound> {
        const compound = await this.compoundRepository.findOneBy({ id: id });

        if (!compound) throw new NotFoundException('Compound not found');

        return compound;
    }

    async findAll(): Promise<Compound[]> {
        return await this.compoundRepository.find();
    }

    async save(compound: SaveCompoundRequest) {
        if(compound.min != undefined && compound.max != undefined && compound.min >= compound.max)
            throw new BadRequestException("Min should be lower than max");

        return await this.compoundRepository.save(compound);
    }

    async update(compound: UpdateActiveRequest) {
        return await this.compoundRepository.update({ id: compound.id }, { active: compound.active });
    }
}
