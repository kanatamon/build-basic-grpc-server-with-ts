import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import type { ProtoGrpcType } from './proto/chat';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { ChatHandlers } from './proto/chat/Chat';
import type { Empty__Output } from './proto/chat/Empty';
import type { MessageList } from './proto/chat/MessageList';

const PROTO_PATH = path.resolve(__dirname, '../proto/chat.proto');

const chatHandlers: ChatHandlers = {
  GetMessages(
    call: ServerUnaryCall<Empty__Output, MessageList>,
    callback: sendUnaryData<MessageList>
  ): void {
    console.log(`${new Date().toISOString()} - GetMessages`);
    callback(null, {
      messages: [{ id: 1, username: 'Nunan', text: 'Hello World 🌈' }],
    });
  },
};

const packageDefinition = loadSync(PROTO_PATH);
const packageObject = loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const server = new Server();
server.addService(packageObject.chat.Chat.service, chatHandlers);
server.bindAsync(
  `localhost:4000`,
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) throw error;
    console.log(`Listening on grpc://localhost:${port}`);
    server.start();
  }
);
