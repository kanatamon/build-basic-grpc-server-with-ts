import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import invariant from 'tiny-invariant';

import type { ServerReadableStream } from '@grpc/grpc-js';
import type { ProtoGrpcType } from './proto/chat';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { ChatHandlers } from './proto/chat/Chat';
import type { Empty, Empty__Output } from './proto/chat/Empty';
import type { MessageList } from './proto/chat/MessageList';
import type { Message, Message__Output } from './proto/chat/Message';

const PROTO_PATH = path.resolve(__dirname, '../proto/chat.proto');

const messages = [{ id: 0, username: 'Nunan', text: 'Hello World 🌈' }];

function getMessageList(): MessageList {
  return { messages };
}

function addMessage(incomingMessage: Message): void {
  invariant(incomingMessage.username, `Must be non-empty string`);
  invariant(incomingMessage.text, `Must be non-empty string`);

  const newMessage: Message__Output = {
    id: messages.length,
    username: incomingMessage.username,
    text: incomingMessage.text,
  };
  messages.push(newMessage);
}

const chatHandlers: ChatHandlers = {
  GetMessages(
    call: ServerUnaryCall<Empty__Output, MessageList>,
    callback: sendUnaryData<MessageList>
  ): void {
    console.log(`${new Date().toISOString()} - GetMessages`);
    callback(null, getMessageList());
  },
  AddMessages: function (
    call: ServerReadableStream<Message__Output, Empty>,
    callback: sendUnaryData<Empty>
  ): void {
    console.log(`${new Date().toISOString()} - AddMessage`);
    call.on('data', (incomingMessage: Message) => {
      addMessage(incomingMessage);
    });
    call.on('end', () => callback(null, {}));
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
