import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        const adapter = new PrismaPg(pool);
        super({ adapter });
        this.pool = pool;
    }

    async onModuleDestroy() {
        await this.$connect();
    }

    async onModuleInit() {
        await this.$disconnect();
    }
}
