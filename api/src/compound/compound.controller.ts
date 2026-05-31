import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveCompoundRequest, UpdateActiveRequest } from './compound.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('compounds')
@ApiBearerAuth('access-token')
@Controller('api/compounds')
export class CompoundController {
    constructor(private readonly compoundService: CompoundService) {}

    @Get()
    @ApiOperation({ summary: 'Get all compounds' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieve all chemical compounds' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async findAll() {
        return await this.compoundService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: 'Get unique compound' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieve one chemical compounds' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Compound not found' })
    async findUnique(@Param('id') id: number) {
        return await this.compoundService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: 'Create compound' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Posted compound is created' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Unknown error' })
    async create(@Body() compound: SaveCompoundRequest) {
        return await this.compoundService.save(compound);
    }

    @Put()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: 'Update compound' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Compound is updated' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Compound not found' })
    async update(@Body() compound: SaveCompoundRequest) {
        return await this.compoundService.save(compound);
    }

    @Patch()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: "Update 'active' attribute of compound" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "'active' attribute has been successfully updated" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Compound not found' })
    async updateActive(@Body() compound: UpdateActiveRequest) {
        return await this.compoundService.update(compound);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: 'Remove compound' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Compound has been successfully removed' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Compound not found' })
    async remove(@Param('id') id: number) {
        return await this.compoundService.remove(id);
    }
}
