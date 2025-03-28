export interface IAuthTypes {
  username: string | null;
  password: string | null;
}

export interface ITodoTypes {
  title: string;
  description: string;
}

export interface INoteTypes {
  completed: boolean;
  description: string;
  title: string;
  user: string;
  __v: number;
  _id: string;
}
