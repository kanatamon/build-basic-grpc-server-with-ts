// Original file: proto/chat.proto

import type {
  Message as _chat_Message,
  Message__Output as _chat_Message__Output,
} from '../chat/Message';

export interface MessageList {
  messages?: _chat_Message[];
}

export interface MessageList__Output {
  messages: _chat_Message__Output[];
}
