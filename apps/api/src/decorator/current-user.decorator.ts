import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtTokenPayload } from 'apps/auth/src/interface/jwt-payload.interface';


export const getCurrentUserByContext = (
  context: ExecutionContext,
): IJwtTokenPayload => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
