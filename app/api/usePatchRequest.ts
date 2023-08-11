import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { customAxios } from "../model/api/shared/custom-axios";
import { HostUrl } from "../model/Host-url";

export const usePatchRequest = <TParams = object, TResponse = object>({
  path,
  params,
  headers,
}: {
  path: string;
  params?: TParams;
  headers?: object;
}) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse<TResponse>,
    AxiosError,
    TParams | undefined
  >([path], (lateParams?: TParams) =>
    customAxios().patch(
      `${HostUrl()}/igoue_admin/app_api/${path}`,
      lateParams ?? params,
      {
        headers: headers ?? undefined,
      }
    )
  );

  return { mutate, error, isLoading, isSuccess };
};
