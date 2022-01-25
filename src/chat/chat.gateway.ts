import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(5001, {cors: true}) 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Клиент: ${client.id} был подключён!`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Клиент: ${client.id} был отключён!`);
    }

    afterInit(server: Server) {
        this.logger.log(`Сокет успешно запущен!`);
    }

    @SubscribeMessage('messageToServer')
    handleMessage(client: Socket, payload: string): void {
        this.logger.log(payload);
        this.server.emit('messageToClient', payload, client.id);
    }
}