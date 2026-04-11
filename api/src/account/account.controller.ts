import { Body, Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './account.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountInterceptor } from './account.interceptor';

@ApiTags("account")
@ApiBearerAuth("access-token")
@Controller('api/account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post("create")
    @UseInterceptors(AccountInterceptor)
    @ApiOperation({ summary: "Create an user" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "User is successfully created" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Client role is not found" })
    async createUser(@Body() user: AccountDto) {
        return await this.accountService.createUser(user);
    }
}
