import React from "react";
import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const BooksList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ReferenceField label="Author" source="author.id" reference="authors">
          <TextField source="lastName" />
        </ReferenceField>
        <TextField source="title" />
      </Datagrid>
    </List>
  );
};
