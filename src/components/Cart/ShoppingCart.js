import { Button, Offcanvas, Stack, Overlay, Popover } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { UseFetchContext } from "../../data/FetchData";
import { useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import PropTypes from "prop-types";

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems, cartQuantity, removeCart } = useShoppingCart();
  const { updateProduct, deleteProduct } = UseFetchContext();
  const { items } = UseFetchContext();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleDateChangeStart = (date) => {
    setSelectedStartDate(date);
  };
  const handleDateChangeEnd = (date) => {
    setSelectedEndDate(date);
  };

  function updateProductCount(event) {
    console.log("diff" + diffDays);
    if (diffDays === 0) {
      console.log("Wybierz date");
      setShow(show);
      setTarget(event.target);
    } else {
      let cartItemsIds = cartItems.map((item) => item.id);
      let updatedData;
      let it;
      for (let i = 0; i < Object.keys(cartItemsIds).length; i++) {
        it = items.find((items) => items.id === cartItemsIds[i]);
        updatedData = {
          ...it,
          productCount: it.productCount - cartItems[i].quantity,
        };

        if (
          updatedData.productCount - cartItems[i].quantity === 0 ||
          updatedData.productCount - cartItems[i].quantity < 0
        ) {
          deleteProduct(it.id);
        } else {
          updateProduct(it.id, updatedData);
        }
      }
      setShow(!show);
      removeCart();
      closeCart();
    }
  }

  const startDate = new Date(selectedStartDate);
  const endDate = new Date(selectedEndDate);
  const diffTime = Math.abs(endDate - startDate);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays)) {
    diffDays = 0;
  }

  return (
    <Offcanvas
      style={{ width: "760px" }}
      show={isOpen}
      onHide={closeCart}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Liczba przedmiotów: {cartQuantity}</Offcanvas.Title>
      </Offcanvas.Header>
      <div className="text-center mr-2 text-lg">
        <p>Nazwa produktu / Cena sztuki / Ilość * cena sztuki</p>
      </div>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="flex mt-4">
            <div className="inline-block mr-4">
              <label className="block font-medium text-gray-700 mb-2">
                Wybierz date wpożyczenia:
              </label>
              <div className="mt-4">
                <DatePicker onChange={handleDateChangeStart}></DatePicker>
              </div>
            </div>
            <div className="inline-block">
              <label className="block font-medium text-gray-700 mb-2">
                Wybierz date zakończenia:
              </label>
              <div className="mt-4">
                <DatePicker onChange={handleDateChangeEnd}></DatePicker>
              </div>
            </div>
            <div className="inline-block">
              <label className="block font-medium text-gray-700  ml-10">
                Ile wybranych dni:
              </label>
              <div className=" mt-4 ml-5">
                <div className=" fw-bold fs-5 ml-10">{diffDays} dni</div>
              </div>
            </div>
          </div>
          <div className="ms-auto fw-bold fs-5">
            Suma:{" "}
            {cartItems.reduce((total, cartItem) => {
              const item = items.find((i) => i.id === cartItem.id);
              if (diffDays === 0) {
                return total + (item?.price || 0) * cartItem.quantity * 1;
              }
              return total + (item?.price || 0) * cartItem.quantity * diffDays;
            }, 0)}{" "}
            {" zł"}
          </div>
          <div>
            <Button
              className="w-40 ml-5 h-30 float-right"
              onClick={updateProductCount}
              ref={ref}
            >
              Kup
            </Button>
            <Overlay
              show={!show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Header as="h3" className="text-black">
                  Błąd!
                </Popover.Header>
                <Popover.Body>
                  <strong>
                    Brak czasu trwania wypożyczenia, ustaw datę początkową i
                    końcową aby wyliczyć długość trwania wypożyczenia.
                  </strong>
                </Popover.Body>
              </Popover>
            </Overlay>
            <Button
              variant="danger"
              className="w-40 h-30 float-right"
              onClick={removeCart}
            >
              Wyczyść koszyk
            </Button>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool,
};
