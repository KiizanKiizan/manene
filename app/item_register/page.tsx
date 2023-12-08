import dynamic from "next/dynamic";
import getFormOptionIndex from "../_api/item_register/form/getFormOptionIndex";
const ItemRegisterContainer = dynamic(
  () => import("../_components/item-register/item-register-container"),
  {
    ssr: false,
  }
);

export default async function ItemRegisterPage() {
  const data = await getFormOptionIndex();
  return <ItemRegisterContainer formOption={data} />;
}
