import { Layout } from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";

export const MyLayout = (props: any) => (
  <>
    <Layout {...props} />
    <ReactQueryDevtools initialIsOpen={false} />
    <footer>Version 2.0</footer>
  </>
);
