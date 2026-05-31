import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountDto } from 'src/account/account.dto';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@ApiTags('auth')
@ApiBearerAuth('access-token')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Receive credentials to log in' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Logged in successfully and Return JWT' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Failed to log in' })
    async login(@Body() user: AccountDto) {
        return {
            access_token: await this.authService.login(user),
        };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Get('is-admin')
    @ApiOperation({ summary: 'Check if authenticated user is admin' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Authenticated user is admin' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'There is no authenticated user' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authenticated user is not admin' })
    async isAdmin() {
        return Promise.resolve({ isAdmin: true });
    }
}
