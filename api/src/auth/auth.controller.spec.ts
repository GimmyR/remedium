import { INestApplication } from '@nestjs/common';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { AccountDto } from 'src/account/account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import request from 'supertest';
import { App } from 'supertest/types';
import { setupTestEnvironment } from '../../test/test-db.helper';
import { AccountService } from 'src/account/account.service';

describe('AuthController', () => {
    let app: INestApplication;
    let container: StartedPostgreSqlContainer;
    let prisma: PrismaService;
    let accountService: AccountService;

    beforeAll(async () => {
        const env = await setupTestEnvironment();
        app = env.app;
        container = env.container;
        prisma = app.get<PrismaService>(PrismaService);
        accountService = app.get<AccountService>(AccountService);
    }, 30000);

    afterAll(async () => {
        if (app) await app.close();

        if (container) await container.stop();
    });

    beforeEach(async () => {
        await prisma.account.deleteMany({});
        await prisma.role.deleteMany({});

        await prisma.role.createMany({
            data: [
                { id: 1, name: 'Client' },
                { id: 2, name: 'Admin' },
            ],
        });

        await accountService.createAdminUser({ username: 'admin', password: 'pwdAdmin' });
        await accountService.createUser({ username: 'johndoe', password: 'pwdJohn' });
    });

    it('should return access_token', async () => {
        const credentials: AccountDto = {
            username: 'johndoe',
            password: 'pwdJohn',
        };

        const res = await request(app.getHttpServer() as App)
            .post('/api/auth/login')
            .send(credentials);

        expect(res.status).toBe(201);
        const body = res.body as { access_token: string };
        expect(body).toBeDefined();
        expect(body.access_token).toBeDefined();
    });

    it('should be an admin and return true', async () => {
        const credentials: AccountDto = {
            username: 'admin',
            password: 'pwdAdmin',
        };

        const res = await request(app.getHttpServer() as App)
            .post('/api/auth/login')
            .send(credentials);

        expect(res.status).toBe(201);
        const body = res.body as { access_token: string };
        expect(body).toBeDefined();
        expect(body.access_token).toBeDefined();

        const res2 = await request(app.getHttpServer() as App)
            .get('/api/auth/is-admin')
            .set('Authorization', `Bearer ${body.access_token}`);

        expect(res2.status).toBe(200);
        const body2 = res2.body as { isAdmin: true };
        expect(body2).toBeDefined();
        expect(body2.isAdmin).toBe(true);
    });
});
