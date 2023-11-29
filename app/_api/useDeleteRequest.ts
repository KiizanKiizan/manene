import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { HostUrl } from "../_model/Host-url";
import { customAxios } from "../_model/api/shared/custom-axios";

export const useDeleteRequest = <TParams = object, TResponse = object>({
  path,
  params,
}: {
  path: string;
  params?: TParams;
}) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse<TResponse>,
    AxiosError,
    TParams | undefined
  >([path], (lateParams?: TParams) =>
    customAxios().delete(`${HostUrl()}/igoue_admin/app_api/${path}`, {
      data: lateParams ?? params,
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    })
  );

  return { mutate, error, isLoading, isSuccess };
};
