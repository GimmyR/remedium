import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { Account } from './account.entity';
import { RoleService } from 'src/role/role.service';

describe('UserService', () => {
    let service: AccountService;

    const mockAccountRepository = {
        findOne: jest.fn(),
        save: jest.fn()
    };

    const mockRoleRepository = {
        find: jest.fn(),
        findOneBy: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AccountService, {
                provide: getRepositoryToken(Account),
                useValue: mockAccountRepository
            }, RoleService, {
                provide: getRepositoryToken(Role),
                useValue: mockRoleRepository
            }],
        }).compile();

        service = module.get<AccountService>(AccountService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
