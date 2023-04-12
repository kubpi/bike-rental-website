import { Button, Container, Nav, Navbar as Navbarr } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import PropTypes from "prop-types";

export function Navbar(props) {
  const { openCart, cartQuantity } = useShoppingCart();

  function openOrNot() {
    if (cartQuantity !== 0) {
      openCart();
    }
  }
  return (
    <Navbarr
      className="mx-auto max-w-7xl  shadow-sm mb-3 border-1"
      style={{ background: "#eef2ff" }}
    >
      <Container>
        <Nav className="text-2xl">
          <Nav.Link to={props.goToPage} as={NavLink}>
            {props.pageTitle}
          </Nav.Link>
        </Nav>
        <Button
          onClick={openOrNot}
          className="w-12 h-12 relative"
          variant="outline"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          {cartQuantity > 0 && (
            <div
              className=" text-sm font-bold rounded-full bg-danger flex justify-content-center algin-items-center text-white w-6 h-6 absolute bottom-0 right-0"
              style={{ transform: "translate(25%, 25%)" }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </Navbarr>
  );
}

Navbar.propTypes = {
  openCart: PropTypes.func,
  cartQuantity: PropTypes.number,
  pageTitle: PropTypes.string,
  goToPage: PropTypes.string,
};
