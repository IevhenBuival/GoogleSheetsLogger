import { Injectable } from '@nestjs/common';
import { ServerService } from './modules/server/server.service';

@Injectable()
export class AppService extends ServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
