import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsTestController } from './compounds-test.controller';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompoundsTest } from './compounds-test.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CompoundsTestService } from './compounds-test.service';
import { CompoundService } from 'src/compound/compound.service';
import { Compound } from 'src/compound/compound.entity';
import { TestDetail } from 'src/test-detail/test-detail.entity';
import { TestDetailService } from 'src/test-detail/test-detail.service';
import request from 'supertest';
import { App } from 'supertest/types';
import { CompoundTestDto } from './compound-test.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

const compound: Compound = {
    id: 1,
    title: 'Paracetamol',
    unit: 'mg',
    min: 500,
    max: 1000,
    active: true,
};

const compoundsTest: CompoundsTest = {
    id: 1,
    testDate: new Date(),
    details: [],
};

const testDetail: TestDetail = {
    id: 1,
    test: compoundsTest,
    compound: compound,
    amount: 200,
};

describe('CompoundsTestController', () => {
    let app: INestApplication;
    let compoundRepository: Repository<Compound>;
    let compoundsTestRepository: Repository<CompoundsTest>;
    let testDetailRepository: Repository<TestDetail>;
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
                    entities: [CompoundsTest, TestDetail, Compound],
                    synchronize: true,
                }),
                TypeOrmModule.forFeature([CompoundsTest, TestDetail, Compound]),
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        global: true,
                        secret: configService.get<string>('JWT_SECRET'),
                    }),
                }),
            ],
            controllers: [CompoundsTestController],
            providers: [CompoundsTestService, TestDetailService, CompoundService],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        compoundRepository = module.get<Repository<Compound>>(getRepositoryToken(Compound));
        compoundsTestRepository = module.get<Repository<CompoundsTest>>(getRepositoryToken(CompoundsTest));
        testDetailRepository = module.get<Repository<TestDetail>>(getRepositoryToken(TestDetail));
        jwtService = module.get<JwtService>(JwtService);
        mockToken = jwtService.sign({ sub: 'user-123', roles: ['Admin'] });
    });

    beforeEach(async () => {
        await testDetailRepository.clear();
        await compoundsTestRepository.clear();
        await compoundRepository.clear();

        await compoundRepository.save([compound]);
        await compoundsTestRepository.save([compoundsTest]);
        await testDetailRepository.save([testDetail]);
    });

    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        await app.close();
    });

    it('should be defined', () => {
        expect(compoundRepository).toBeDefined();
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
                const tests = res.body as CompoundsTest[];
                expect(Array.isArray(tests)).toBe(true);
                expect(tests.length).toBe(1);
                expect(tests[0].id).toBe(compoundsTest.id);
                expect(tests[0].testDate).toBe(compoundsTest.testDate.toISOString());
                expect(tests[0].details.length).toBe(1);
                expect(tests[0].details[0].amount).toBe(testDetail.amount);
            });
    });
});
