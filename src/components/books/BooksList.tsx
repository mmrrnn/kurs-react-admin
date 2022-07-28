import React from "react";
import {
  Datagrid,
  FunctionField,
  List,
  ReferenceField,
  TextField,
} from "react-admin";
import { Author } from "../../types/entities";

export const BooksList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ReferenceField
          label="Author"
          source="author.id"
          reference="authors"
          link="show"
        >
          <FunctionField
            render={(author: Author) =>
              `${author.firstName} ${author.lastName}`
            }
          />
        </ReferenceField>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
