export interface IBaseNote {
  userEmail: string;
  customerName: string;
  customerNumber: string;
  purposeUse: string;
  kind: string;
  transactionType: string;
  date: string;
  content: string;
  location: string;
  createdAt: number;
  id: string;
}

export interface INote extends IBaseNote { }

export interface INoteError {
  error: string;
  [key: string]: never | string;
}


export type NoteResponse = INote | INoteError;