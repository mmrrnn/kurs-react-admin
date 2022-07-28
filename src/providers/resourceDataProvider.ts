import {
  CondOperator,
  QuerySort,
  RequestQueryBuilder,
} from "@nestjsx/crud-request";
import {
  CreateParams,
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";
import { apiUrl } from "../consts";

import {
  composeFilter,
  composeQueryParams,
  mergeEncodedQueries,
} from "./utils";

type Identifier = string | number;
export interface KeyValueType {
  [key: string]: any;
  id: Identifier;
}

export class ResourceDataProvider<DataType extends KeyValueType> {
  constructor(
    public url = apiUrl,
    public queryMainParameter = "id",
    public httpClient = fetchUtils.fetchJson
  ) {}

  public async create(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<DataType>> {
    return this.httpClient(`${this.url}/${resource}`, {
      body: JSON.stringify(params.data),
      method: "POST",
    }).then(({ json }) => ({
      data: { ...params.data, id: json[this.queryMainParameter] },
    }));
  }

  public async delete(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<DataType>> {
    const url = `${this.url}/${resource}/${params.id}`;
    const { json } = await this.httpClient(url, {
      method: "DELETE",
    });

    return {
      data: {
        ...json,
        id: json[this.queryMainParameter],
      },
    };
  }

  public async deleteMany(
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> {
    return Promise.all(
      params.ids.map(async (id) =>
        this.httpClient(`${this.url}/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json) }));
  }

  public async getList(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<DataType>> {
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

    const url = `${this.url}/${resource}?${query}`;

    return this.httpClient(url).then(({ json }) => ({
      data: json.data.map((entry: DataType) => ({
        ...entry,
        id: entry[this.queryMainParameter],
      })),
      total: json.total,
    }));
  }

  public async getMany(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<DataType>> {
    const query = RequestQueryBuilder.create()
      .setFilter({
        field: this.queryMainParameter,
        operator: CondOperator.IN,
        value: `${params.ids as unknown as string}`,
      })
      .query();

    const url = `${this.url}/${resource}?${query}`;

    return this.httpClient(url).then(({ json }) => ({
      data: json.map((entry: DataType) => ({
        ...entry,
        id: entry[this.queryMainParameter],
      })),
    }));
  }

  public async getManyReference(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<DataType>> {
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
    const url = `${this.url}/${resource}?${query}`;

    return this.httpClient(url).then(({ json }) => ({
      data: json.data.map((entry: DataType) => ({
        ...entry,
        id: entry[this.queryMainParameter],
      })),
      total: json.total,
    }));
  }

  public async getOne(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<DataType>> {
    const url = `${this.url}/${resource}/${params.id}`;
    const { json } = await this.httpClient(url, {
      method: "GET",
    });

    return {
      data: {
        ...json,
        id: json[this.queryMainParameter],
      },
    };
  }

  public async update(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<DataType>> {
    const data = countDiff(params.data, params.previousData);

    return this.httpClient(`${this.url}/${resource}/${params.id}`, {
      body: JSON.stringify(data),
      method: "PATCH",
    }).then(({ json }) => ({
      data: {
        ...json,
        id: json[this.queryMainParameter],
      },
    }));
  }

  public async updateMany(
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult> {
    return Promise.all(
      params.ids.map(async (id) =>
        this.httpClient(`${this.url}/${resource}/${id}`, {
          body: JSON.stringify(params.data),
          method: "PUT",
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => json),
    }));
  }
}
function countDiff(data: Partial<any>, previousData: any) {
  throw new Error("Function not implemented.");
}
