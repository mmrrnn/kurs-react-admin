import { DataProvider } from "react-admin";

import { DataProviderResource } from "../consts";
import { ResourcesList } from "../types/dataProvider.types";
import { BooksDataProvider } from "./booksDataProvider";
import { ImagesDataProvider } from "./imagesDataProvider";
import { ResourceDataProvider } from "./resourceDataProvider";

export const createDataProvider = (): DataProvider => {
  const resources: ResourcesList = {};
  const imagesDataProvider = new ImagesDataProvider();

  resources[DataProviderResource.authors] = new ResourceDataProvider();
  resources[DataProviderResource.images] = imagesDataProvider;
  resources[DataProviderResource.books] = new BooksDataProvider(imagesDataProvider);

  return {
    create: async (resource, params) =>
      resources[resource].create(resource, params),
    delete: async (resource, params) =>
      resources[resource].delete(resource, params),
    deleteMany: async (resource, params) =>
      resources[resource].deleteMany(resource, params),
    getList: async (resource, params) =>
      resources[resource].getList(resource, params),
    getMany: async (resource, params) =>
      resources[resource].getMany(resource, params),
    getManyReference: async (resource, params) =>
      resources[resource].getManyReference(resource, params),
    getOne: async (resource, params) =>
      resources[resource].getOne(resource, params),
    update: async (resource, params) =>
      resources[resource].update(resource, params),
    updateMany: async (resource, params) =>
      resources[resource].updateMany(resource, params),
  };
};
