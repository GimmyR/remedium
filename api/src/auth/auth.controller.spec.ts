import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AccountService } from 'src/account/account.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { Role } from 'src/role/role.entity';
import { Account } from 'src/account/account.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { AccountDto } from 'src/account/account.dto';
import request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App } from 'supertest/types';

describe('AuthController', () => {
  let app: INestApplication;
  let roleRepository: Repository<Role>;
  let accountRepository: Repository<Account>;

  beforeAll(async () => {
    process.env.JWT_SECRET =
      'loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx';
    process.env.PASSWORD_STRENGTH = '12';

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Account, Role],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Account, Role]),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            global: true,
            secret: configService.get<string>('JWT_SECRET'),
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, AccountService, RoleService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    accountRepository = module.get<Repository<Account>>(
      getRepositoryToken(Account),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await roleRepository.clear();
    await roleRepository.save([{ id: 1, name: 'Client' }]);

    await accountRepository.clear();
    await accountRepository.save([
      {
        id: 1,
        username: 'johndoe',
        password:
          '$2a$12$AiWntMCIWJkMWFyD6RIa/uIrRAup40XYpobOm3EjlSd6rKlyTOrnG',
        roles: [{ id: 1, name: 'Client' }],
      },
    ]);
  });

  it('should be defined', () => {
    expect(roleRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(accountRepository).toBeDefined();
  });

  it('should return access_token', async () => {
    const credentials: AccountDto = {
      username: 'johndoe',
      password: 'pwd123',
    };

    const res = await request(app.getHttpServer() as App)
      .post('/api/auth/login')
      .send(credentials);

    expect(res.status).toBe(201);
    const body = res.body as { access_token: string };
    expect(body).toBeDefined();
    expect(body.access_token).toBeDefined();
  });
});
