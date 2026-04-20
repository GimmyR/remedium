import { Controller, Get, HttpStatus, UseInterceptors } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { CompoundInterceptor } from './compound.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('compound')
@Controller('api/compound')
export class CompoundController {
    constructor(private readonly compoundService: CompoundService) {}

    @Get('all')
    @UseInterceptors(CompoundInterceptor)
    @ApiOperation({ summary: 'Get all compounds' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieve all chemical compounds' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async findAll() {
        return await this.compoundService.findAll();
    }
}
