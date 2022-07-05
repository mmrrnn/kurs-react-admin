// @ts-nocheck
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { RequestQueryBuilder } from "@nestjsx/crud-request";

const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: async (resource, params) => {
    const { pagination, sort } = params;

    const queryString = RequestQueryBuilder.create()
      .setLimit(pagination.perPage)
      .setPage(pagination.page)
      .sortBy(sort)
      .query();

    const url = `${apiUrl}/${resource}?${queryString}`;

    return httpClient(url).then(({ json }) => json);
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },
};

export default dataProvider;

// import { DataProvider } from "react-admin";

// import { AuthorDataProvider } from "./dataProviders/AuthorDataProvider";

// export const dataProvider = (): DataProvider => {
//   const resources: any = {};
//   resources['authors'] = new AuthorDataProvider();

//   return {
//     create: async (resource, params) =>
//       resources[resource].create(resource, params),
//     delete: async (resource, params) =>
//       resources[resource].delete(resource, params),
//     deleteMany: async (resource, params) =>
//       resources[resource].deleteMany(resource, params),
//     getList: async (resource, params) =>
//       resources[resource].getList(resource, params),
//     getMany: async (resource, params) =>
//       resources[resource].getMany(resource, params),
//     getManyReference: async (resource, params) =>
//       resources[resource].getManyReference(resource, params),
//     getOne: async (resource, params) =>
//       resources[resource].getOne(resource, params),
//     update: async (resource, params) =>
//       resources[resource].update(resource, params),
//     updateMany: async (resource, params) =>
//       resources[resource].updateMany(resource, params),
//   };
// };
