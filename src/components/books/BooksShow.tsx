import React from "react";
import {
  ImageField,
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
          <ImageField source="image.path" title="book cover" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
