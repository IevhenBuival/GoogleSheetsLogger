import { Message } from './Message';

export interface WebSocketListen {
  message: (message: Message) => void;
}
