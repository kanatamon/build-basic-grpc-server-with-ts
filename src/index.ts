import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import invariant from 'tiny-invariant';

import type { ServerReadableStream, ServerDuplexStream } from '@grpc/grpc-js';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { ProtoGrpcType } from './proto/chat';
import type { ChatHandlers } from './proto/chat/Chat';
import type { Empty, Empty__Output } from './proto/chat/Empty';
import type { MessageList } from './proto/chat/MessageList';
import type { Message, Message__Output } from './proto/chat/Message';

const PROTO_PATH = path.resolve(__dirname, '../proto/chat.proto');

const messages = [{ id: 0, username: 'Nunan', text: 'Hello World 🌈' }];
const subscriptions = new Map<number, (message: Message__Output) => void>();

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

  for (const callback of subscriptions.values()) {
    callback(newMessage);
  }
}

function subscribeMessage(
  callback: (message: Message__Output) => any
): () => void {
  const subscriptionId = Date.now();
  subscriptions.set(subscriptionId, callback);
  return () => {
    subscriptions.delete(subscriptionId);
  };
}

const chatHandlers: ChatHandlers = {
  GetMessages(
    call: ServerUnaryCall<Empty__Output, MessageList>,
    callback: sendUnaryData<MessageList>
  ): void {
    console.log(`${new Date().toISOString()} - GetMessages`);
    callback(null, getMessageList());
  },
  AddMessages(
    call: ServerReadableStream<Message__Output, Empty>,
    callback: sendUnaryData<Empty>
  ): void {
    console.log(`${new Date().toISOString()} - AddMessages`);
    call.on('data', (incomingMessage: Message) => {
      addMessage(incomingMessage);
    });
    call.on('end', () => callback(null, {}));
  },
  LiveMessages(call: ServerDuplexStream<Message__Output, Message>): void {
    console.log(`${new Date().toISOString()} - LiveMessages`);
    const unsubscribe = subscribeMessage((message) => {
      call.write(message);
    });
    call.on('data', (incomingMessage: Message) => {
      addMessage(incomingMessage);
    });
    call.on('end', () => {
      unsubscribe();
      call.end();
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
