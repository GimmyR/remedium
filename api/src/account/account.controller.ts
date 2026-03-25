import { Body, Controller, Get, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './account.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountInterceptor } from './account.interceptor';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("account")
@ApiBearerAuth("access-token")
@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post("create")
    @ApiOperation({ summary: "Create an user" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "User is successfully created" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Client role is not found" })
    async createUser(@Body() user: AccountDto) {
        return await this.accountService.createUser(user);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(AccountInterceptor)
    @Get("profile")
    @ApiOperation({ summary: "Get informations of authentified user without password" })
    @ApiResponse({ status: HttpStatus.OK, description: "User is found" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User is not found" })
    async getProfile(@Request() request) {
        const user = await this.accountService.getProfile(request.user.username);
        return user;
    }
}
