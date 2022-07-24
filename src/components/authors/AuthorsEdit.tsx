import { Edit } from "react-admin"
import { AuthorsForm } from "./AuthorsForm"

export const AuthorsEdit = (props: any): JSX.Element => {
  return (
    <Edit {...props}>
      <AuthorsForm />
    </Edit>
  )
}