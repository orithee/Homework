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
  payload: boolean;
  type: string;
}

export interface Cards {
  title: string;
  description: string;
  code: string;
  id: number;
}
