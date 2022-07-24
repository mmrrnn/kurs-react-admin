import React from "react";
import { Show, Tab, TabbedShowLayout, TextField } from "react-admin";

export const AuthorsShow: React.FC | undefined = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="User main info">
          <TextField source="id" />
          <TextField source="firstName" />
          <TextField source="lastName" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
