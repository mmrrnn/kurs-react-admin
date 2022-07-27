import { ResourceDataProvider } from "../providers/resourceDataProvider";

export interface ResourcesList {
  [key: string]: ResourceDataProvider<any>;
}
