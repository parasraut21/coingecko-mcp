// src/shared/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { AppConfigService } from './config.service';


@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],


        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class ConfigModule { }