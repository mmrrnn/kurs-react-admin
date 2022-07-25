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
        <Tab label="Book main info">
          <TextField source="id" />
          <TextField source="title" />
          <ReferenceField
            label="Author"
            source="author.id"
            reference="authors"
            link="show"
          >
            <>
              <TextField source="firstName" /> <TextField source="lastName" />
            </>
          </ReferenceField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
