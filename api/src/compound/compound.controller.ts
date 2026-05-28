import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveCompoundRequest } from './compound.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('compound')
@Controller('api/compound')
export class CompoundController {
    constructor(private readonly compoundService: CompoundService) {}

    @Get('all')
    @ApiOperation({ summary: 'Get all compounds' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieve all chemical compounds' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async findAll() {
        return await this.compoundService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("Admin")
    async create(@Body() compound: SaveCompoundRequest) {
        return await this.compoundService.save(compound);
    }

    @Put()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("Admin")
    async update(@Body() compound: SaveCompoundRequest) {
        return await this.compoundService.save(compound);
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("Admin")
    async findUnique(@Param("id") id: number) {
        return await this.compoundService.findOne(id);
    }
}
