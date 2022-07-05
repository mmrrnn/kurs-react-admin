import { Admin, Resource } from "react-admin";
import dataProvider from "./providers/dataProvider";
import { MyLayout } from "./Layout";
import { AuthorsList } from "./components/AuthorsList";
import { BooksList } from "./components/BooksList";

const App = () => (
  <Admin dataProvider={dataProvider} layout={MyLayout}>
    <Resource
      name="authors"
      options={{ label: "authors" }}
      list={AuthorsList}
    />
    <Resource name="books" options={{ label: "books" }} list={BooksList} />
  </Admin>
);

export default App;
