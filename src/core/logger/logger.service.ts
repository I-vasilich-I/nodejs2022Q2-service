import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';

const logLevels = ['debug', 'error', 'log', 'verbose', 'warn'] as LogLevel[];

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  constructor(logLevel: number) {
    super();
    super.setLogLevels(logLevels.slice(0, logLevel + 1));
  }

  error(message: any, stack?: string, context?: string, ...rest: any) {
    // add your tailored logic here
    super.error(message, stack, context, ...rest);
  }
}
