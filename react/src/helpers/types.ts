import { Socket } from 'socket.io-client';

export type signInForm = {
  name: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  uuid: string | undefined;
};

export interface Mentor {
  isStudent: boolean;
  name: FormDataEntryValue | null;
}

export interface Student {
  isStudent: boolean;
  name: FormDataEntryValue | null;
}

export interface updateUserLoggedAction {
  payload: Mentor | Student | undefined;
  type: string;
}

export interface updateCodeOpenStatus {
  payload: string;
  type: string;
}

export interface updateCurrentLinks {
  payload: { student: string; mentor: string };
  type: string;
}

export type SessionLinks = { student: string; mentor: string };

export interface Cards {
  title: string;
  description: string;
  code: string;
  id: number;
}
export type SocketClientType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
export interface ServerToClientEvents {
  code_change_to_client: (msg: string) => void;
}

export interface ClientToServerEvents {
  code_change_from_client: (msg: string) => void;
}
