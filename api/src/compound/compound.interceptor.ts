import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Compound } from './compound.entity';

@Injectable()
export class CompoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data: Compound[]) => {
            return data.map(compound => ({ 
                id: compound.id, 
                title: compound.title, 
                unit: compound.unit 
            }));
        }));
    }
}
