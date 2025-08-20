import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class StderrLogger implements LoggerService {
    private writeToStderrFormatted(level: string, message: any, context?: string) {
        process.stderr.write(message + '\n');
    }

    error(message: any, trace?: string, context?: string) {
        this.writeToStderrFormatted('error', message, context);
        if (trace) {
            this.writeToStderrFormatted('error', trace, context);
        }
    }

    log(message: any, context?: string) {
        this.writeToStderrFormatted('log', message, context);
    }

    warn(message: any, context?: string) {
        this.writeToStderrFormatted('warn', message, context);
    }

    debug(message: any, context?: string) {
        this.writeToStderrFormatted('debug', message, context);
    }

    verbose(message: any, context?: string) {
        this.writeToStderrFormatted('verbose', message, context);
    }
}