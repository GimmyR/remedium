import { Test, TestingModule } from '@nestjs/testing';
import { CompoundController } from './compound.controller';
import { CompoundService } from './compound.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compound.entity';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('CompoundController', () => {
    let app: INestApplication;
    let repository: Repository<Compound>;
    let jwtService: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        process.env.JWT_SECRET = 'loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx';
        process.env.PASSWORD_STRENGTH = '12';

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [Compound],
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([Compound]),
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        global: true,
                        secret: configService.get<string>('JWT_SECRET'),
                    }),
                }),
            ],
            controllers: [CompoundController],
            providers: [CompoundService],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        repository = module.get<Repository<Compound>>(getRepositoryToken(Compound));
        jwtService = module.get<JwtService>(JwtService);
        mockToken = jwtService.sign({ sub: "user-123", roles: ['Admin'] });
    });

    beforeEach(async () => {
        await repository.clear();
        await repository.save([{ id: 1, title: 'Paracetamol', unit: 'mg', min: 500, max: 1000, active: true }]);
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
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

    it('should return one compound', () => {
        return request(app.getHttpServer() as App)
            .get('/api/compounds/1')
            .set("Authorization", `Bearer ${mockToken}`)
            .expect(200)
            .expect((res) => {
                const compound = res.body as Compound;
                expect(compound).toBeDefined();
                expect(compound.title).toBe('Paracetamol');
            });
    });

    it('should create one compound', () => {
        return request(app.getHttpServer() as App)
            .post('/api/compounds')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ title: "Ibuprofen", unit: "mg", min: "200", max: "400", active: true })
            .expect(201)
            .expect((res) => {
                const compound = res.body as Compound;
                expect(compound).toBeDefined();
                expect(compound.title).toBe('Ibuprofen');
            });
    });
});
