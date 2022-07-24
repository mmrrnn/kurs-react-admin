import React from "react";
import {
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";

export const BooksShow: React.FC | undefined = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="User main info">
          <TextField source="id" />
          <TextField source="title" />
          <ReferenceField label="Author" source="author.id" reference="authors">
            <TextField source="firstName" /> <TextField source="lastName" />
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
