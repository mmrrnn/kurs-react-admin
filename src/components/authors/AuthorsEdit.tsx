import { Edit } from "react-admin"
import { AuthorsForm } from "./AuthorsForm"

export const AuthorsEdit: React.FC = (props): JSX.Element => {
  return (
    <Edit {...props}>
      <AuthorsForm />
    </Edit>
  )
}