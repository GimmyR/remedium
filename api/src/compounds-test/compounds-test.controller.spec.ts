import { INestApplication } from '@nestjs/common';
import { CompoundsTestService } from './compounds-test.service';
import { CompoundService } from 'src/compound/compound.service';
import request from 'supertest';
import { App } from 'supertest/types';
import { CompoundTestDto } from './compound-test.dto';
import { JwtService } from '@nestjs/jwt';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupTestEnvironment } from '../../test/test-db.helper';

const compound = {
    id: 1,
    title: 'Paracetamol',
    unit: 'mg',
    min: 500,
    max: 1000,
    active: true,
};

const testDetail = {
    compoundId: compound.id,
    amount: 200,
};

describe('CompoundsTestController', () => {
    let app: INestApplication;
    let container: StartedPostgreSqlContainer;
    let prisma: PrismaService;
    let compoundService: CompoundService;
    let compoundsTestService: CompoundsTestService;
    let jwtService: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        const env = await setupTestEnvironment();
        app = env.app;
        container = env.container;
        prisma = app.get<PrismaService>(PrismaService);
        compoundService = app.get<CompoundService>(CompoundService);
        compoundsTestService = app.get<CompoundsTestService>(CompoundsTestService);
        jwtService = app.get<JwtService>(JwtService);
        mockToken = jwtService.sign({ sub: 'user-123', roles: ['Admin'] });
    }, 30000);

    afterAll(async () => {
        if(app)
            await app.close();

        if(container)
            await container.stop();
    });

    beforeEach(async () => {
        await prisma.testDetail.deleteMany({});
        await prisma.compoundsTest.deleteMany({});
        await prisma.compound.deleteMany({});

        await compoundService.create(compound);
        await compoundsTestService.makeTests([testDetail]);
    });

    it('should return error', async () => {
        const newTest = [{ compoundId: 1, amount: 200 }];

        const res = await request(app.getHttpServer() as App)
            .post('/api/compounds-tests')
            .send(newTest);

        expect(res.status).toBe(201);
        const tests = res.body as CompoundTestDto[];
        expect(Array.isArray(tests)).toBe(true);
        expect(tests.length).toBe(1);
        expect(tests[0].error).toBe(true);
        expect(tests[0].message).not.toBe(undefined);
    });

    it('Should return compounds tests with details', async () => {
        return await request(app.getHttpServer() as App)
            .get('/api/compounds-tests')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200)
            .expect((res) => {
                const tests = res.body;
                expect(Array.isArray(tests)).toBe(true);
                expect(tests.length).toBe(1);
                expect(tests[0].details.length).toBe(1);
                expect(tests[0].details[0].compound.id).toBe(compound.id);
                expect(tests[0].details[0].amount).toBe(testDetail.amount);
            });
    });
});
