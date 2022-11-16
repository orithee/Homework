export type connection = { on: (arg0: string, arg1: () => void) => void };

export type checkSignIn = { success: boolean; student: boolean };

export interface ServerToClientEvents {
  code_change_to_client: (msg: string) => void;
}

export interface ClientToServerEvents {
  code_change_from_client: (msg: string) => void;
}
