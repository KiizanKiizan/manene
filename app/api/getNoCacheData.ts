import { HostUrl } from "../model/Host-url";
import { toCamelCaseObject } from "../service/toCamelCaseObject";
import { toSnakeCaseString } from "../service/toSnakeCaseString";

export default async function getNoCacheData<TResponse, TParams = object>({
  path,
  params,
}: {
  path: string;
  params?: TParams;
}) {
  const getParams = (): string => {
    if (params === undefined || params === null) return "";
    if (Object.keys(params).length === 0) return "";
    return `?${Object.keys(params)
      .map((key: string) => {
        const value = params[key as keyof TParams];
        const snakeCaseKey = toSnakeCaseString(key);
        return `${encodeURIComponent(snakeCaseKey)}=${encodeURIComponent(
          value as string
        )}`;
      })
      .join("&")}`;
  };
  const res = await fetch(
    `${HostUrl()}/igoue_admin/app_api/${path}${getParams()}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: TResponse = await res.json();
  if (Array.isArray(data)) {
    return data.map((d) => {
      return toCamelCaseObject(d as Record<string, unknown>);
    }) as TResponse;
  } else {
    return toCamelCaseObject(data as Record<string, unknown>) as TResponse;
  }
}
