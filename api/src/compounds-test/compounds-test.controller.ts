import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CompoundTestDto } from './compound-test.dto';
import { CompoundsTestService } from './compounds-test.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('compounds-tests')
@ApiBearerAuth("access-token")
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
    @ApiOperation({ summary: "Find all compounds tests with details" })
    @ApiResponse({ status: HttpStatus.OK, description: "All compounds tests are found" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "No authenticated admin to use this endpoint correctly" })
    async findAllTests() {
        return await this.compoundsTestService.findAll();
    }
}
