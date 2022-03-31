import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { GlobalConstant } from '../constants';

export const Public = (): CustomDecorator => SetMetadata(GlobalConstant.META_KEY_NAME.isPublic, true);
