import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsTestController } from './compounds-test.controller';

describe('CompoundsTestController', () => {
  let controller: CompoundsTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompoundsTestController],
    }).compile();

    controller = module.get<CompoundsTestController>(CompoundsTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
