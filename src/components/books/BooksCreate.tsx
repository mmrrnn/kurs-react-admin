import { Create } from "react-admin"
import { BooksForm } from "./BooksForm"

export const BooksCreate: React.FC = (props) => {
  return (
    <Create {...props}>
      <BooksForm />
    </Create>
  )
}