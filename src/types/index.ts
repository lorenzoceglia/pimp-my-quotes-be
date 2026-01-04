export interface User {
  id: string;
  email: string;
}

export interface Quote {
  quote: string;
  author: string | null;
  id: number;
  userId: string;
  createdAt: Date;
}