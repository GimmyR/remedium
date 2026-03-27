import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from './account.dto';
import { hash } from 'bcrypt';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly userRepository: Repository<Account>,

        private readonly roleService: RoleService
    ) {}

    async createUser(user: AccountDto): Promise<string> {
        const salt = process.env.PASSWORD_STRENGTH;

        if(!salt)
            throw new InternalServerErrorException("Password strength is undefined");

        const hashedPassword = await hash(user.password, parseInt(salt));
        const clientRole = await this.roleService.findUnique("Client");
        await this.userRepository.save({ ...user, password: hashedPassword, roles: [clientRole] });
        return "User is created successfully";
    }

    async findUser(username: string): Promise<Account | null> {
        return await this.userRepository.findOne({
            where: {
                username: username
            },
            relations: ['roles']
        });
    }
}
