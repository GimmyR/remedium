import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("role")
@ApiBearerAuth("access-token")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Post('create')
    @ApiOperation({ summary: "Create a role (admin only)" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Role is successfully created" })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Something went wrong" })
    async createRole(@Body() role: RoleDto) {
        const result = await this.roleService.createRole(role);
        return result;
    }

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