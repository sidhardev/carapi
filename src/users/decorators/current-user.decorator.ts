import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from '@nestjs/common';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  },
);
