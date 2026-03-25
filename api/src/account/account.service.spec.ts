import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { Account } from './account.entity';
import { RoleService } from 'src/role/role.service';

describe('UserService', () => {
    let service: AccountService;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AccountService, {
                provide: getRepositoryToken(Account),
                useValue: mockRepository
            }, RoleService, {
                provide: getRepositoryToken(Role),
                useValue: mockRepository
            }],
        }).compile();

        service = module.get<AccountService>(AccountService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
