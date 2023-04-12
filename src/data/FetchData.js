import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const FetchContext = createContext({});

export function UseFetchContext() {
  return useContext(FetchContext);
}

export function FetchProvider({ children }) {
 
  const URL = ` http://localhost:8000`;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(`${URL}/product`);
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);

  useEffect(() => {
    if (page === "Sortuj malejąco!" || page === "Sortuj rosnąco!") {
    } else {
      fetch(page)
        .then((response) => response.json())
        .then((data) => setItems(data));
    }
  }, [page]);

  function useFetchForDetails(id) {
    const [item, setItem] = useState([]);
    useEffect(() => {
      fetch(`${URL}/product/${id}`)
        .then((response) => response.json())
        .then((data) => setItem(data));
    }, [id]);
    return item;
  }

  const handleSortAsc = (items) => {
    setPage("Sortuj malejąco!");
    setItems(
      items.sort((a, b) => {
        return b.price - a.price;
      })
    );
  };

  const handleSortDesc = (items) => {
    setPage("Sortuj rosnąco!");
    setItems(
      items.sort((a, b) => {
        return a.price - b.price;
      })
    );
  };

  const resetData = () => {
    setPage(`${URL}/product`);
  };

  const getProductTypes = (type) => {
    setPage(`${URL}/product?type=${type}`);
  };

  useEffect(() => {
    fetch(`${URL}/type`)
      .then((response) => response.json())
      .then((data) => setType(data))
      .catch((error) => console.log("error", error));
  }, [URL]);

  useEffect(() => {
    fetch(`${URL}/size`)
      .then((response) => response.json())
      .then((data) => setSize(data))
      .catch((error) => console.log("error", error));
  }, [URL]);

  async function getProductsToadd(Product) {
    const response = await fetch(`${URL}/product`, {
      method: "POST",
      body: JSON.stringify(Product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newProduct = await response.json();
    setItems((oldItems) => [...oldItems, newProduct]);
  }

  async function deleteProduct(id) {
    await fetch(`${URL}/product/${id}`, {
      method: "DELETE",
    }).then((response) => {
    });
    setItems((oldItems) => oldItems.filter((item) => item.id !== id));
  }

  async function updateProduct(id, data) {
    fetch(`${URL}/product/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <FetchContext.Provider
      value={{
        handleSortAsc,
        handleSortDesc,
        resetData,
        items,
        type,
        getProductTypes,
        getProductsToadd,
        size,
        deleteProduct,
        useFetchForDetails,
        updateProduct,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
