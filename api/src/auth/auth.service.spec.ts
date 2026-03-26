import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.entity';

describe('AuthService', () => {
    let service: AuthService;

    const mockAccountRepository = {
        findOne: jest.fn(),
        save: jest.fn()
    };

    const mockRoleRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, AccountService, {
                provide: getRepositoryToken(Account),
                useValue: mockAccountRepository
            }, RoleService, {
                provide: getRepositoryToken(Role),
                useValue: mockRoleRepository
            }, JwtService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
