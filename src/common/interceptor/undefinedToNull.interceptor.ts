import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class UndefinedToNullInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>) {
    return next.handle().pipe((data) => (data === undefined ? null : data));
  }
}
