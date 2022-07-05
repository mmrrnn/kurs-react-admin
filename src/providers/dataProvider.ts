import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";
import {
  CondOperator,
  QuerySort,
  RequestQueryBuilder,
} from "@nestjsx/crud-request";

const apiUrl = "http://localhost:8080";
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { pagination, sort } = params;

    const queryString = RequestQueryBuilder.create()
      .setLimit(pagination.perPage)
      .setPage(pagination.page)
      .sortBy(sort as QuerySort)
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
    const { pagination, sort, filter } = params;

    const queryString = RequestQueryBuilder.create({
      filter: filter.push({
        field: params.target,
        operator: CondOperator.EQUALS,
        value: params.id,
      }),
    })
      .setLimit(pagination.perPage)
      .setPage(pagination.page)
      .sortBy(sort as QuerySort)
      .query();

    const url = `${apiUrl}/${resource}?${queryString}`;

    return httpClient(url).then(({ json }) => json);
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
