import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { UseFetchContext } from "../../data/FetchData";
import PropTypes from "prop-types";

export function CartItem({ id, quantity }) {
  const { useFetchForDetails } = UseFetchContext();
  const { removeFromCart } = useShoppingCart();

  let item = useFetchForDetails(id);

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        alt="rower"
        style={{ width: "115px", height: "65px", objectFit: "cover" }}
      ></img>

      <div className="me-auto">
        <div>
          <span className="text-1xl"> {item.title + " "}</span>
          {quantity > 1 && (
            <span className="text-2xl ml-3">x{quantity}</span>
          )}{" "}
        </div>
      </div>
      <div className=" mr-3">
        <span className="text-lg"> {item.price + " zł"} </span>
      </div>
      <div className="text-lg mr-3">
        {item.price * quantity}
        {"zł"}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
