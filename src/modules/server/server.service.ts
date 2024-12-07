import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ServerService {
  #clients: Socket[] = [];

  addClient(client: Socket) {
    this.#clients.push(client);
  }
  removeClient(id: string) {
    this.#clients = this.#clients.filter((client) => client.id !== id);
  }
  getClientById(id: string): Socket | null {
    return this.#clients.find((client) => client.id === id);
  }
}
