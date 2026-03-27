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
                    createUser: jest.fn()
                }
            }, {
                provide: JwtService,
                useValue: {
                    verifyAsync: jest.fn()
                }
            }]
        }).compile();

        controller = module.get<AccountController>(AccountController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
