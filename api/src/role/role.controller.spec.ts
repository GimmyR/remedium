import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './role.service';

describe('RoleController', () => {
    let controller: RoleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [{
                provide: RoleService,
                useValue: {
                    findAll: jest.fn()
                }
            }, {
                provide: JwtService,
                useValue: {
                    verifyAsync: jest.fn()
                }
            }]
        }).compile();

        controller = module.get<RoleController>(RoleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
