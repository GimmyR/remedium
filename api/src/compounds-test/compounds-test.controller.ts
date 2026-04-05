import { Body, Controller, Post } from '@nestjs/common';
import { CompoundTestDto } from './compound-test.dto';
import { CompoundsTestService } from './compounds-test.service';

@Controller('api/compounds-test')
export class CompoundsTestController {
    constructor(private readonly compoundsTestService: CompoundsTestService) {}

    @Post()
    async testCompounds(@Body() tests: CompoundTestDto[]) {
        return await this.compoundsTestService.makeTests(tests);
    }
}
