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

describe('CompoundsTestController', () => {
  let app: INestApplication;
  let compoundRepository: Repository<Compound>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [CompoundsTest, TestDetail, Compound],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([CompoundsTest, TestDetail, Compound]),
      ],
      controllers: [CompoundsTestController],
      providers: [CompoundsTestService, TestDetailService, CompoundService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    compoundRepository = module.get<Repository<Compound>>(
      getRepositoryToken(Compound),
    );
  });

  beforeEach(async () => {
    await compoundRepository.clear();
    await compoundRepository.save([
      {
        id: 1,
        title: 'Paracetamol',
        unit: 'mg',
        min: 500,
        max: 1000,
        active: true,
      },
    ]);
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

    const res = await request(app.getHttpServer())
      .post('/api/compounds-test')
      .send(newTest);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].error).toBe(true);
    expect(res.body[0].message).not.toBe(undefined);
  });
});
