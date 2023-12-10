import { QueryClient } from "@tanstack/react-query";
import { HostUrl } from "../_model/Host-url";
import { customAxios } from "../_model/api/shared/custom-axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default async function postData<TResponse, TParams = object>({
  path,
  params,
}: {
  path: string;
  params?: TParams;
  isEnabled?: boolean;
}) {
  const data: TResponse = await queryClient.fetchQuery({
    queryKey: [path, params],
    queryFn: () =>
      customAxios()
        .post(`${HostUrl()}/igoue_admin/app_api/${path}`, params, {
          headers: {
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        })
        .then((r) => {
          return r.data;
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        }),
  });

  return data;
}