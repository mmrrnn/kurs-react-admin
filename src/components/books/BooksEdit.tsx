import { Edit } from "react-admin"
import { BooksForm } from "./BooksForm"

export const BooksEdit = (props: any): JSX.Element => {
  return (
    <Edit {...props}>
      <BooksForm />
    </Edit>
  )
}