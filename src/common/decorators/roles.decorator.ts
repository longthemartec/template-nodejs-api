import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { GlobalConstant } from '../constants';

export const Roles = (...roles: string[]): CustomDecorator => SetMetadata(GlobalConstant.META_KEY_NAME.role, roles);
