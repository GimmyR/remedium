import { Test, TestingModule } from '@nestjs/testing';
import { CompoundsTestService } from './compounds-test.service';

describe('CompoundsTestService', () => {
  let service: CompoundsTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoundsTestService],
    }).compile();

    service = module.get<CompoundsTestService>(CompoundsTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
