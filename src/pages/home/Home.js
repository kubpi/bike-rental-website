import React from "react";
import { ProductBox } from "../../components/Box/Product-box";
import { ProductHeader } from "../../components/Products-header";
import { UseFetchContext } from "../../data/FetchData";
import { Navbar } from "../../components/Navbar";

export function Home() {
  const { items } = UseFetchContext();

  return (
    <>
      <Navbar pageTitle="Wypożyczalnia rowerów" goToPage="/"></Navbar>
      <ProductHeader></ProductHeader>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <ProductBox {...item} />
        </React.Fragment>
      ))}
    </>
  );
}
