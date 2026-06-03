import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Account } from '@prisma/client';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccountInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: Account) => ({
                ...data,
                password: undefined,
            })),
        );
    }
}
