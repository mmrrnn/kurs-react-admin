import { Edit } from "react-admin"
import { BooksForm } from "./BooksForm"

export const BooksEdit: React.FC = (props) => {
  return (
    <Edit {...props}>
      <BooksForm />
    </Edit>
  )
}