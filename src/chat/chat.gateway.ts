import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    this.server.emit('newChat', createChatDto);
    // return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    this.server.emit('allChat', this.chatService.findAll());
    // return this.chatService.findAll();
  }

  @SubscribeMessage('joinRoom')
  joinRoom(roomId: string) {
    this.server.socketsJoin(roomId);
  }

  @SubscribeMessage('typing')
  typing(@MessageBody('roomId') roomId: string) {
    this.server.to(roomId).emit('typing');
  }
}
