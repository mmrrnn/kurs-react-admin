import {
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const BooksForm: React.FC = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput
        required
        fullWidth
        id="title"
        label="Title"
        source="title"
        InputLabelProps={{ shrink: true }}
      />
      <ReferenceInput
        required
        fullWidth
        id="authorId"
        label="Author"
        source="authorId"
        reference="authors"
        InputLabelProps={{ shrink: true }}
      >
        <SelectInput
          optionText={(author) => `${author.firstName} ${author.lastName}`}
        />
      </ReferenceInput>
    </SimpleForm>
  );
};
