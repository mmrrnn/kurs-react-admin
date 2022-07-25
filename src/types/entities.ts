export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  bookId: string;
}

export type Book = {
  id: number;
  title: string;
  authorId: number;
}

export type Image = {
  id: string;
  path: string;
  bookId: number;
  status: number;
}