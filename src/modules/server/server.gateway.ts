import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/Types/Message';
import { WebSocketListen } from 'src/Types/WebSocketListen';
import { ServerService } from './server.service';

//ws://localhost:5000/google
@WebSocketGateway(Number(process.env.SERVER_HOST) || 5001, {
  initialPacket: 'google',
  cors: { origin: '*' },
})
export class ServerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private serverService: ServerService) {}

  @WebSocketServer() server: Server<WebSocketListen>;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message) {
    this.server.emit('message', message);
    console.log('emit', message);
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    if (!this.serverService.getClientById(client.id))
      this.serverService.addClient(client);
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.serverService.removeClient(client.id);
    client.disconnect(true);
  }
  afterInit(server: Server) {
    console.log('server init');
  }
}
