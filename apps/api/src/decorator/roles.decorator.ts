import { SetMetadata } from '@nestjs/common';
import { Role } from 'apps/auth/src/user/entity/user.entity';


export const ROLES_KEY = 'role';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);
