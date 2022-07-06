import { CondOperator, QueryFilter } from "@nestjsx/crud-request";
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

export const composeQueryParams = (queryParams: any = {}): string => {
  return stringify(fetchUtils.flattenObject(queryParams));
};

export const composeFilter = (paramsFilter: any): QueryFilter[] => {
  const flatFilter = fetchUtils.flattenObject(paramsFilter);

  return Object.keys(flatFilter).map((key) => {
    const splitKey = key.split("--");

    let field = splitKey[0];
    let ops = splitKey[1];

    if (!ops) {
      if (
        typeof flatFilter[key] === "boolean" ||
        typeof flatFilter[key] === "number" ||
        flatFilter[key].match(/^\d+$/)
      ) {
        ops = CondOperator.EQUALS;
      } else {
        ops = CondOperator.CONTAINS;
      }
    }

    if (field.startsWith("_") && field.includes(".")) {
      field = field.split(/\.(.+)/)[1];
    }

    return { field, operator: ops, value: flatFilter[key] } as QueryFilter;
  });
};

export const mergeEncodedQueries = (...encodedQueries: string[]): string =>
  encodedQueries.map((query) => query).join("&");
