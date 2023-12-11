import deleteData from "../deleteData";

type TParams = {
  id: number;
};

export default async function deleteItemsDestroy(params: TParams) {
  const data = await deleteData<TParams>({
    path: `items/${params.id}`,
  });

  return data;
}
