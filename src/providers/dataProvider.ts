import {
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
} from "react-admin";
import { stringify } from "query-string";
import {
  CondOperator,
  QuerySort,
  RequestQueryBuilder,
} from "@nestjsx/crud-request";
import {
  composeFilter,
  composeQueryParams,
  mergeEncodedQueries,
} from "./utils";

const apiUrl = process.env.API_URL || "https://mpapiez-nest-api.rumblefish.dev";
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    const { page, perPage } = params.pagination;
    const { q: queryParams, ...filter } = params.filter || {};

    const encodedQueryParams = composeQueryParams(queryParams);
    const encodedQueryFilter = RequestQueryBuilder.create({
      filter: composeFilter(filter),
    })
      .setLimit(perPage)
      .setPage(page)
      .sortBy(params.sort as QuerySort)
      .setOffset((page - 1) * perPage)
      .query();

    const query = mergeEncodedQueries(encodedQueryParams, encodedQueryFilter);

    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => json);
  },

  getOne: async (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    const query = RequestQueryBuilder.create()
      .setFilter({
        field: "id",
        operator: CondOperator.IN,
        value: `${params.ids as unknown as string}`,
      })
      .query();

    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const { page, perPage } = params.pagination;
    const { q: queryParams, ...otherFilters } = params.filter || {};
    const filter = composeFilter(otherFilters);
    filter.push({
      field: params.target,
      operator: CondOperator.EQUALS,
      value: params.id,
    });
    const encodedQueryParams = composeQueryParams(queryParams);
    const encodedQueryFilter = RequestQueryBuilder.create({
      filter,
    })
      .sortBy(params.sort as QuerySort)
      .setLimit(perPage)
      .setOffset((page - 1) * perPage)
      .query();
    const query = mergeEncodedQueries(encodedQueryParams, encodedQueryFilter);
    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url).then(({ json }) => json);
  },

  update: async (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: async (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: async (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => json),

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    return Promise.all(
      params.ids.map(async (id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json) }));
  },
};

export default dataProvider;
