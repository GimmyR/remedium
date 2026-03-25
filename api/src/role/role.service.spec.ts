import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

describe('RoleService', () => {
    let service: RoleService;

    const mockRoleRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleService, {
                provide: getRepositoryToken(Role),
                useValue: mockRoleRepository
            }],
        }).compile();

        service = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
