import { Layout } from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";

export const MyLayout = (props: any) => (
  <>
    <Layout {...props} />
    <ReactQueryDevtools initialIsOpen={false} />
    <footer>dupa v5</footer>
  </>
);
