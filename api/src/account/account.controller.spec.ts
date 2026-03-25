import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
    let controller: AccountController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [{
                provide: AccountService,
                useValue: {
                    findOne: jest.fn(),
                    create: jest.fn()
                }
            }, {
                provide: JwtService,
                useValue: {
                    sign: jest.fn()
                }
            }]
        }).compile();

        controller = module.get<AccountController>(AccountController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
