import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Details } from "./pages/details/Details";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { FetchProvider } from "./data/FetchData";
import { AddProduct } from "./pages/addProduct/AddProduct";

function App() {
  return (
    <>
      <FetchProvider>
        <ShoppingCartProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </ShoppingCartProvider>
      </FetchProvider>
    </>
  );
}

export default App;
