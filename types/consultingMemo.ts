export interface IBaseMemo {
  userEmail: string;
  title: string;
  content: string;
  location: string;
  id: string;
}

export interface IMemo extends IBaseMemo { }

export interface IMemoError {
  error: string;
  [key: string]: never | string;
}

export type MemoResponse = IMemo | IMemoError;
