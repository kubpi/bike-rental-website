import { Formularz as Form } from "../../components/Form";
import { Navbar } from "../../components/Navbar";
import { ProductHeader } from "../../components/Products-header";

export function AddProduct() {
  return (
    <>
      <Navbar pageTitle="Dodaj produkt" goToPage={`/`}></Navbar>
      <ProductHeader></ProductHeader>
      <Form></Form>
    </>
  );
}
