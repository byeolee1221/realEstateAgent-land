export interface IDoc {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface IOpinion {
  id: string;
  opinion: string;
  userEmail: string;
  userName: string;
  userImage: string;
  createdAt: string;
}
