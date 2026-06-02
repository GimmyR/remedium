import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AccountDto } from './account.dto';
import { App } from 'supertest/types';
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { PrismaService } from 'src/prisma/prisma.service';
import { setupTestEnvironment } from '../../test/test-db.helper';

describe('AccountController', () => {
    let app: INestApplication;
    let container: StartedPostgreSqlContainer;
    let prisma: PrismaService;

    beforeAll(async () => {
        const env = await setupTestEnvironment();
        app = env.app;
        container = env.container;
        prisma = app.get<PrismaService>(PrismaService);
    }, 30000);

    afterAll(async () => {
        if(app)
            await app.close();

        if(container)
            await container.stop();
    });

    beforeEach(async () => {
        await prisma.account.deleteMany({});
        await prisma.role.deleteMany({});
        await prisma.role.create({
            data: { id: 1, name: 'Client' }
        });
    });

    it('should return Account', async () => {
        const newAccount: AccountDto = {
            username: 'johndoe',
            password: 'pwd123',
        };

        const res = await request(app.getHttpServer() as App)
            .post('/api/account/create')
            .send(newAccount);

        expect(res.status).toBe(201);
        const body = res.body as AccountDto;
        expect(body).toBeDefined();
        expect(body.username).toBe(newAccount.username);
    });
});
