import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerGateway } from './server.gateway';

@Module({
  providers: [ServerService, ServerGateway],
})
export class ServerModule {}
