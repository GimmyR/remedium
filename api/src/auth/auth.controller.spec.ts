import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AccountService } from 'src/account/account.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{
                provide: AuthService,
                useValue: {
                    login: jest.fn(),
                    validateUser: jest.fn()
                }
            }, {
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

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
