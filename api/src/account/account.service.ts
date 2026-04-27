import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { AccountDto } from './account.dto';

@Injectable()
export class AccountService implements OnModuleInit {
    constructor(
        @InjectRepository(Account)
        private readonly userRepository: Repository<Account>,

        private readonly roleService: RoleService,
    ) {}

    async onModuleInit() {
        const adminUsername = process.env.ADMIN_USERNAME as string;
        const adminPassword = process.env.ADMIN_PASSWORD as string;

        if (!adminUsername) throw new InternalServerErrorException('Admin username is undefined');
        if (!adminPassword) throw new InternalServerErrorException('Admin password is undefined');

        const user: AccountDto = { username: adminUsername, password: adminPassword };

        if (!(await this.adminExists(user))) await this.createAdminUser(user);
    }

    async adminExists(adminUser: AccountDto): Promise<boolean> {
        const admin = await this.userRepository.findOneBy({
            username: adminUser.username,
            roles: { name: 'Admin' },
        });

        return admin != null;
    }

    async createAdminUser(user: AccountDto): Promise<Account> {
        const salt = process.env.PASSWORD_STRENGTH;

        if (!salt) throw new InternalServerErrorException('Password strength is undefined');

        const hashedPassword = await hash(user.password, parseInt(salt));
        const adminRole = await this.roleService.createAdmin();
        return await this.userRepository.save({ ...user, password: hashedPassword, roles: [adminRole] });
    }

    async createUser(user: AccountDto): Promise<Account> {
        const salt = process.env.PASSWORD_STRENGTH;

        if (!salt) throw new InternalServerErrorException('Password strength is undefined');

        const hashedPassword = await hash(user.password, parseInt(salt));
        const role = await this.roleService.findUnique('Client');
        return await this.userRepository.save({ ...user, password: hashedPassword, roles: [role] });
    }

    async findUser(username: string): Promise<Account | null> {
        return await this.userRepository.findOne({
            where: {
                username: username,
            },
            relations: ['roles'],
        });
    }
}
