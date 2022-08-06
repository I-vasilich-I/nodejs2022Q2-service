import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, params, body } = request;

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const log = `
      ${method} ${originalUrl} ${statusCode} ${statusMessage} - ${ip}
      params: ${JSON.stringify(params)}
      body: ${body ? JSON.stringify(body) : ''}
      `;

      this.logger.log(log);

      fs.appendFile('http.log', log, { encoding: 'utf8' }, (err) => {
        if (err) throw err;
      });
    });

    next();
  }
}
