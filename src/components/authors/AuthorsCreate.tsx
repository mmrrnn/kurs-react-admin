import { Create } from "react-admin"
import { AuthorsForm } from "./AuthorsForm"

export const AuthorsCreate = (props: any): JSX.Element => {
  return (
    <Create {...props}>
      <AuthorsForm />
    </Create>
  )
}