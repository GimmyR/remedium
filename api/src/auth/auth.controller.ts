import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountDto } from 'src/account/account.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Receive credentials to log in' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Logged in successfully and Return JWT',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Failed to log in',
  })
  async login(@Body() user: AccountDto) {
    return {
      access_token: await this.authService.login(user),
    };
  }
}
