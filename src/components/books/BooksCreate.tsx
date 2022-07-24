import { Create } from "react-admin"
import { BooksForm } from "./BooksForm"

export const BooksCreate = (props: any): JSX.Element => {
  return (
    <Create {...props}>
      <BooksForm />
    </Create>
  )
}