export enum DataProviderResource {
  books = "books",
  authors = "authors",
  images = "images",
}

export const apiUrl =
  process.env.REACT_APP_API_URL || "https://mpapiez-nest-api.rumblefish.dev";
