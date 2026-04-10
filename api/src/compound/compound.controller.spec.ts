import { Test, TestingModule } from '@nestjs/testing';
import { CompoundController } from './compound.controller';
import { CompoundService } from './compound.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compound.entity';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import request from "supertest";

describe('CompoundController', () => {
    let app: INestApplication;
    let repository: Repository<Compound>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    entities: [Compound],
                    synchronize: true
                }),
                TypeOrmModule.forFeature([Compound])
            ],
            controllers: [CompoundController],
            providers: [CompoundService]
        }).compile();

        app = module.createNestApplication();
        app.init();
        repository = module.get<Repository<Compound>>(getRepositoryToken(Compound));
    });

    beforeEach(async () => {
        await repository.clear();
        await repository.save([
            { id: 1, title: "Paracetamol", unit: "mg", min: 500, max: 1000, active: true }
        ]);
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it("should return an array of one compound", () => {
        return request(app.getHttpServer())
                .get("/api/compound/all")
                .expect(200)
                .expect((res) => {
                    expect(Array.isArray(res.body)).toBe(true);
                    expect(res.body.length).toBe(1);
                    expect(res.body[0].title).toBe("Paracetamol");
                })
    });
});