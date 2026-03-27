import { Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("role")
@ApiBearerAuth("access-token")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @UseGuards(AuthGuard)
    @Get('/all')
    @ApiOperation({ summary: "Get all roles" })
    @ApiResponse({ status: HttpStatus.OK, description: "Retrieve all roles" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Something went wrong" })
    async getAllRoles() {
        const result = await this.roleService.findAll();
        return result;
    }
}