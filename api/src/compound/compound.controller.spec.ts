import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { JwtService } from '@nestjs/jwt';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupTestEnvironment } from '../../test/test-db.helper';
import { CompoundService } from './compound.service';
import { Compound } from '@prisma/client';

describe('CompoundController', () => {
    let app: INestApplication;
    let container: StartedPostgreSqlContainer;
    let prisma: PrismaService;
    let compoundService: CompoundService;
    let jwtService: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        const env = await setupTestEnvironment();
        app = env.app;
        container = env.container;
        prisma = app.get<PrismaService>(PrismaService);
        compoundService = app.get<CompoundService>(CompoundService);
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
        await prisma.compound.deleteMany({});
        await compoundService.create({ id: 1, title: 'Paracetamol', unit: 'mg', min: 500, max: 1000, active: true });
    });

    it('should return an array of one compound', () => {
        return request(app.getHttpServer() as App)
            .get('/api/compounds')
            .expect(200)
            .expect((res) => {
                const body = res.body as Compound[];
                expect(Array.isArray(body)).toBe(true);
                expect(body.length).toBe(1);
                expect(body[0].title).toBe('Paracetamol');
            });
    });

    it('should return one compound', async () => {
        const res = await request(app.getHttpServer() as App)
            .get('/api/compounds/1')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(res.status).toBe(200);
        const compound = res.body as Compound;
        expect(compound).toBeDefined();
        expect(compound.title).toBe('Paracetamol');
    });

    it('should create one compound', () => {
        return request(app.getHttpServer() as App)
            .post('/api/compounds')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ id: 2, title: 'Ibuprofen', unit: 'mg', min: 200, max: 400, active: true })
            .expect(201)
            .expect((res) => {
                const compound = res.body as Compound;
                expect(compound).toBeDefined();
                expect(compound.title).toBe('Ibuprofen');
            });
    });

    it('should edit one compound', () => {
        return request(app.getHttpServer() as App)
            .put('/api/compounds')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ id: 1, title: 'Paracetamol', unit: 'mg', min: 200, max: 800, active: true })
            .expect(200);
    });

    it('should edit partially one compound', () => {
        return request(app.getHttpServer() as App)
            .patch('/api/compounds')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ id: 1, active: false })
            .expect(200);
    });

    it('should remove one compound', () => {
        return request(app.getHttpServer() as App)
            .delete('/api/compounds/1')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200);
    });
});
