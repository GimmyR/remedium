import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CompoundTestDto } from './compound-test.dto';
import { CompoundsTestService } from './compounds-test.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('compounds-tests')
@Controller('api/compounds-tests')
export class CompoundsTestController {
    constructor(private readonly compoundsTestService: CompoundsTestService) {}

    @Post()
    @ApiOperation({ summary: 'Make test for given compounds' })
    @ApiBody({ type: [CompoundTestDto] })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Tests done' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async testCompounds(@Body() tests: CompoundTestDto[]) {
        return await this.compoundsTestService.makeTests(tests);
    }

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("Admin")
    async findAllTests() {
        return await this.compoundsTestService.findAll();
    }
}
