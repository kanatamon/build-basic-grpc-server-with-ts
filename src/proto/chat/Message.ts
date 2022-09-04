// Original file: proto/chat.proto

export interface Message {
  id?: number;
  username?: string;
  text?: string;
}

export interface Message__Output {
  id: number;
  username: string;
  text: string;
}
