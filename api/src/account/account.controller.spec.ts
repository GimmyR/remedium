import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';
import request from "supertest";
import { AccountDto } from './account.dto';

describe('UserController', () => {
    let app: INestApplication;
    let repository: Repository<Role>;

    beforeAll(async () => {
        process.env.JWT_SECRET="loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx";
        process.env.PASSWORD_STRENGTH="12";
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    entities: [Account, Role],
                    synchronize: true
                }),
                TypeOrmModule.forFeature([Account, Role])
            ],
            controllers: [AccountController],
            providers: [AccountService, RoleService, JwtService]
        }).compile();

        app = module.createNestApplication();
        app.init();
        repository = module.get<Repository<Role>>(getRepositoryToken(Role));
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await repository.clear();
        await repository.save([
            { id: 1, name: "Client" }
        ]);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it("should return Account", async () => {
        const newAccount: AccountDto = {
            username: "johndoe",
            password: "pwd123"
        };

        const res = await request(app.getHttpServer())
            .post("/api/account/create")
            .send(newAccount);

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.username).toBe(newAccount.username);
    });
});
