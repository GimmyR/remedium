import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { hash } from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { AccountDto } from './account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        private readonly roleService: RoleService
    ) {}

    async onModuleInit() {
        const adminUsername = process.env.ADMIN_USERNAME as string;
        const adminPassword = process.env.ADMIN_PASSWORD as string;

        if (!adminUsername) throw new InternalServerErrorException('Admin username is undefined');
        if (!adminPassword) throw new InternalServerErrorException('Admin password is undefined');

        const user: AccountDto = { username: adminUsername, password: adminPassword };

        if (!(await this.adminExists(user))) await this.createAdminUser(user);
    }

    async adminExists(adminUser: AccountDto) {
        const admin = await this.prisma.account.findUnique({
            where: {
                username: adminUser.username,
                roles: {
                    some: {
                        name: "Admin"
                    }
                }
            }
        });

        return admin != null;
    }

    async createAdminUser(user: AccountDto) {
        const salt = process.env.PASSWORD_STRENGTH;

        if (!salt) throw new InternalServerErrorException('Password strength is undefined');

        const hashedPassword = await hash(user.password, parseInt(salt));
        const adminRole = await this.roleService.createAdmin();

        return await this.prisma.account.create({
            data: {
                ...user,
                password: hashedPassword,
                roles: {
                    connect: [adminRole]
                }
            }
        });
    }

    async createUser(user: AccountDto) {
        const salt = process.env.PASSWORD_STRENGTH;

        if (!salt) throw new InternalServerErrorException('Password strength is undefined');

        const hashedPassword = await hash(user.password, parseInt(salt));
        const role = await this.roleService.findUnique('Client');
        
        return await this.prisma.account.create({
            data: {
                ...user,
                password: hashedPassword,
                roles: {
                    connect: [role]
                }
            }
        });
    }

    async findUser(username: string) {
        return await this.prisma.account.findUnique({
            where: {
                username: username
            },
            include: {
                roles: true
            }
        });
    }
}
