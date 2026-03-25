import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AccountDto } from 'src/account/account.dto';
import { Account } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: AccountService,
        private readonly jwtService: JwtService
    ) {}

    async login(user: AccountDto): Promise<string> {
        const error = new UnauthorizedException({ error: "Username or password are not correct" });
        const result = await this.userService.findUser(user.username);

        if(!result)
            throw error;
        
        if(!await compare(user.password, result.password))
            throw error;

        return await this.generateToken(result);
    }

    private async generateToken(user: Account): Promise<string> {
        return await this.jwtService.signAsync({ 
            sub: user.id, 
            name: user.username,
            roles: user.roles.map(role => role.name)
        });
    }
}
