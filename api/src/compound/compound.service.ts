import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compound } from './compound.entity';
import { Repository } from 'typeorm';

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
}
