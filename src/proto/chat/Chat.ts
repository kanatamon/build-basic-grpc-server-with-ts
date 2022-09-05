// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  Empty as _chat_Empty,
  Empty__Output as _chat_Empty__Output,
} from '../chat/Empty';
import type {
  Message as _chat_Message,
  Message__Output as _chat_Message__Output,
} from '../chat/Message';
import type {
  MessageList as _chat_MessageList,
  MessageList__Output as _chat_MessageList__Output,
} from '../chat/MessageList';

export interface ChatClient extends grpc.Client {
  AddMessages(
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  AddMessages(
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  AddMessages(
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  AddMessages(
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  addMessages(
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  addMessages(
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  addMessages(
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;
  addMessages(
    callback: grpc.requestCallback<_chat_Empty__Output>
  ): grpc.ClientWritableStream<_chat_Message>;

  GetMessages(
    argument: _chat_Empty,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _chat_Empty,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _chat_Empty,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _chat_Empty,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _chat_Empty,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _chat_Empty,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _chat_Empty,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _chat_Empty,
    callback: grpc.requestCallback<_chat_MessageList__Output>
  ): grpc.ClientUnaryCall;
}

export interface ChatHandlers extends grpc.UntypedServiceImplementation {
  AddMessages: grpc.handleClientStreamingCall<
    _chat_Message__Output,
    _chat_Empty
  >;

  GetMessages: grpc.handleUnaryCall<_chat_Empty__Output, _chat_MessageList>;
}

export interface ChatDefinition extends grpc.ServiceDefinition {
  AddMessages: MethodDefinition<
    _chat_Message,
    _chat_Empty,
    _chat_Message__Output,
    _chat_Empty__Output
  >;
  GetMessages: MethodDefinition<
    _chat_Empty,
    _chat_MessageList,
    _chat_Empty__Output,
    _chat_MessageList__Output
  >;
}
