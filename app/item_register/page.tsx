import getFormOptionIndex from "../_api/item_register/form/getFormOptionIndex";
import ItemRegisterContainer from "../_components/item-register/item-register-container";

export default async function ItemRegisterPage() {
  const data = await getFormOptionIndex();
  return <ItemRegisterContainer formOption={data} />;
}
