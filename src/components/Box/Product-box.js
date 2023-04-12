import { Button, Card, Nav, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { UseFetchContext } from "../../data/FetchData";
import { PropTypes } from "prop-types";
import React from "react";

export function ProductBox(props) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { deleteProduct } = UseFetchContext();
  const quantity = getItemQuantity(props.id);

  function handleClick(id) {
    deleteProduct(id);
    removeFromCart(id);
  }

  return (
    <Card className="mx-auto max-w-7xl bg-white shadow-sm  mb-4 ">
      <Card.Body className="flex items-center">
        <Table>
          <tbody>
            <tr className="flex justify-between">
              <th className="flex items-center justify-between">
                <Card.Img src={props.image} alt="rower" />
              </th>
              <th>
                <div className="ml-20 mb-5 text-base justify-between">
                  <Card.Title> {props.title}</Card.Title>
                  <Card.Text> {props.description}</Card.Text>
                  <Card.Text> Typ : {props.type} </Card.Text>
                  <Card.Text> Ilość: {props.productCount}</Card.Text>
                </div>
              </th>
              <th>
                <div className="ml-20 justify-between">
                  <span className="flex justify-end text-red-400 mb-5 mr-5 text-3xl">
                    {props.price + " zł/dzień"}
                  </span>
                  <div className="mb-5">
                    <Button variant="danger">
                      <Nav.Link to={`/details/${props.id}`} as={NavLink}>
                        Szczegóły
                      </Nav.Link>
                    </Button>
                  </div>
                  {quantity === 0 ? (
                    <Button
                      variant="danger"
                      onClick={() => increaseCartQuantity(props.id)}
                    >
                      Dodaj do koszyka
                    </Button>
                  ) : (
                    <div
                      className="d-flex align-items-center flex-column"
                      style={{ gap: ".5rem" }}
                    >
                      <Button onClick={() => increaseCartQuantity(props.id)}>
                        +
                      </Button>

                      <div>
                        <span className="fs-3">{quantity} </span> w koszyku
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ gap: ".5rem" }}
                      >
                        <Button onClick={() => decreaseCartQuantity(props.id)}>
                          -
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => removeFromCart(props.id)}
                          variant="danger"
                          size="sm"
                        >
                          Usuń z koszyka
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th>
                <Button
                  className=" ml-20 h-100"
                  variant="danger"
                  onClick={() => handleClick(props.id)}
                >
                  Usuń przedmiot
                </Button>
              </th>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

ProductBox.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
