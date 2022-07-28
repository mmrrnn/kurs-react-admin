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
  image: Image | null;
  imageId: string | null;
}

export type Image = {
  id: string;
  path: string;
  status: number;
}