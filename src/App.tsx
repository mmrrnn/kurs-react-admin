import { Admin, Resource } from "react-admin";
import dataProvider from "./providers/dataProvider";
import { MyLayout } from "./Layout";
import { AuthorsList } from "./components/authors/AuthorsList";
import { BooksList } from "./components/books/BooksList";
import { AuthorsShow } from "./components/authors/AuthorsShow";
import { BooksShow } from "./components/books/BooksShow";
import { AuthorsEdit } from "./components/authors/AuthorsEdit";
import { AuthorsCreate } from "./components/authors/AuthorsCreate";
import { BooksEdit } from "./components/books/BooksEdit";
import { BooksCreate } from "./components/books/BooksCreate";

const App = () => (
  <Admin dataProvider={dataProvider} layout={MyLayout}>
    <Resource
      name="authors"
      options={{ label: "authors" }}
      list={AuthorsList}
      show={AuthorsShow}
      edit={AuthorsEdit}
      create={AuthorsCreate}
    />
    <Resource
      name="books"
      options={{ label: "books" }}
      list={BooksList}
      show={BooksShow}
      edit={BooksEdit}
      create={BooksCreate}
    />
  </Admin>
);

export default App;
