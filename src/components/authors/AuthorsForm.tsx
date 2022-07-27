import { SimpleForm, TextInput } from "react-admin";

export const AuthorsForm: React.FC = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput
        required
        fullWidth
        id="firstName"
        label="First Name"
        source="firstName"
        InputLabelProps={{ shrink: true }}
      />
      <TextInput
        required
        fullWidth
        id="lastName"
        label="Last Name"
        source="lastName"
        InputLabelProps={{ shrink: true }}
      />
    </SimpleForm>
  );
};
