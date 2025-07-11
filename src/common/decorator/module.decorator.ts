import { SetMetadata } from '@nestjs/common';

export const MODULE_KEY = 'module';

export const ModuleAccess = (module: string) => SetMetadata(MODULE_KEY, module);
