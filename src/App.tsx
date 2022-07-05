import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./providers/dataProvider";
import { MyLayout } from "./Layout";

const App = () => (
  <Admin dataProvider={dataProvider} layout={MyLayout}>
    <Resource name="authors" list={ListGuesser} />
    <Resource name="books" list={ListGuesser} />
  </Admin>
);

export default App;
