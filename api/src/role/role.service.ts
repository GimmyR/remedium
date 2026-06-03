import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.role.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }

    async findUnique(name: string) {
        const result = await this.prisma.role.findUnique({
            where: { name: name },
        });

        if (!result) throw new NotFoundException('Role not found');

        return result;
    }

    async createAdmin() {
        return await this.prisma.role.upsert({
            where: { name: 'Admin' },
            update: {},
            create: { name: 'Admin' },
        });
    }
}
