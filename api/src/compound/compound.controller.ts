import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CompoundService } from './compound.service';
import { CompoundInterceptor } from './compound.interceptor';

@Controller('api/compound')
export class CompoundController {
    constructor(private readonly compoundService: CompoundService) {}

    @Get("all")
    @UseInterceptors(CompoundInterceptor)
    async findAll() {
        return await this.compoundService.findAll();
    }
}
