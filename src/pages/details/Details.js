import { useParams } from "react-router-dom";
import { ProductHeader } from "../../components/Products-header";
import { UseFetchContext } from "../../data/FetchData";
import { Navbar } from "../../components/Navbar";
import { DetailsProductBox } from "../../components/Box/Details-product-box";
import { PropTypes } from "prop-types";
import React from "react";

export function Details() {
  const { useFetchForDetails } = UseFetchContext();
  let { id } = useParams();
  let product = useFetchForDetails(id);

  return (
    <>
      <Navbar pageTitle="Szczegóły" goToPage={`/`}></Navbar>
      <ProductHeader></ProductHeader>
      <DetailsProductBox {...product} />
    </>
  );
}

Details.propTypes = {
  id: PropTypes.number,
};
