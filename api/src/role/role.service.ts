import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async findAll(): Promise<Role[]> {
        const result = await this.roleRepository.find({ order: { id: 'ASC' } });
        return result;
    }

    async findUnique(name: string): Promise<Role> {
        const result = await this.roleRepository.findOneBy({ name: name });

        if (!result) throw new NotFoundException('Role not found');

        return result;
    }
}
