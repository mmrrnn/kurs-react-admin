import React from "react";

import {
  Datagrid,
  List,
  TextField,
} from "react-admin";

export const AuthorsList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
      </Datagrid>
    </List>
  );
};
