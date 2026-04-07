import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CompoundTestDto } from './compound-test.dto';
import { CompoundsTestService } from './compounds-test.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("compounds-test")
@Controller('api/compounds-test')
export class CompoundsTestController {
    constructor(private readonly compoundsTestService: CompoundsTestService) {}

    @Post()
    @ApiOperation({ summary: "Make test for given compounds" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Tests done" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Unknown error" })
    async testCompounds(@Body() tests: CompoundTestDto[]) {
        return await this.compoundsTestService.makeTests(tests);
    }
}