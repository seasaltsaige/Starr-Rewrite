import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import GuildType from 'src/guilds/gqlTypes/guild.type';

@WebSocketGateway()
export class EventsGateway {

  @WebSocketServer()
  public socket: Server


  public emitPrefixUpdate(guild: GuildType): SocketIO.Namespace {
    return this.socket.emit("prefix-update", guild)
  }

}
