import { useQuery } from "@tanstack/react-query";
import { HostUrl } from "../model/Host-url";
import { customAxios } from "../model/api/shared/custom-axios";

export const useGetRequest = <TResponse, TParams = object, THeaders = object>({
  path,
  params,
  headers,
  isEnabled,
}: {
  path: string;
  params?: TParams;
  headers?: THeaders;
  isEnabled?: boolean;
}) => {
  const { data, refetch, error, isLoading } = useQuery<TResponse, Error>(
    [path, params],
    () =>
      customAxios()
        .get(`${HostUrl()}/igoue_admin/app_api/${path}`, {
          headers: headers ?? undefined,
          params: {
            ...params,
          },
        })
        .then((r) => {
          return r.data;
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        }),
    {
      enabled: isEnabled ?? true,
    }
  );

  return {
    data,
    refetch,
    error,
    isLoading,
  };
};
