import { Create } from "react-admin"
import { AuthorsForm } from "./AuthorsForm"

export const AuthorsCreate: React.FC = (props) => {
  return (
    <Create {...props}>
      <AuthorsForm />
    </Create>
  )
}