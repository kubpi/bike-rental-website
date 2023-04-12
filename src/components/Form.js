import { useRef, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Overlay,
  Popover,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseFetchContext } from "../data/FetchData";

export function Formularz() {
  const { type, getProductsToadd, size } = UseFetchContext();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [typeData, setTypeData] = useState("");
  const [productCount, setProductCount] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [sizeData, setSizeData] = useState("");
  const [color, setColor] = useState("");
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(
    "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
  );

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isProductCountValid, setProductCountValid] = useState(true);
  const [isModelValid, setProductModelValid] = useState(true);
  const [isPriceValid, setProductPriceValid] = useState(true);

  const [titleErrormessage, setTitleErorrMessage] = useState("");
  const [descriptionErrormessage, setDescriptionErrormessage] = useState("");
  const [productCountErrormessage, setProductCountErrormessage] = useState("");
  const [productModelErrormessage, setProductModelErrormessage] = useState("");
  const [productPriceErrormessage, setProductPriceErrormessage] = useState("");

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const navigate = useNavigate();

  function addTodata(event) {
    if (
      save() === false ||
      isTitleValid === false ||
      isDescriptionValid === false ||
      isProductCountValid === false ||
      isModelValid === false ||
      isPriceValid === false
    ) {
      setShow(show);
      setTarget(event.target);
      console.log("Popraw formularz");
    } else {
      setShow(!show);
      getProductsToadd(product);
      navigate("/");
    }
  }

  function save() {
    if (
      title === "" ||
      description === "" ||
      productCount === "" ||
      price === "" ||
      model === ""
    ) {
      if (title === "") {
        setIsTitleValid(false);
        setTitleErorrMessage("Uzupełnij puste pole!");
      }
      if (description === "") {
        setIsDescriptionValid(false);
        setDescriptionErrormessage("Uzupełnij puste pole!");
      }

      if (productCount === "") {
        setProductCountValid(false);
        setProductCountErrormessage("Uzupełnij puste pole!");
      }
      if (model === "") {
        setProductModelValid(false);
        setProductModelErrormessage("Uzupełnij puste pole!");
      }
      if (price === "") {
        setProductPriceValid(false);
        setProductPriceErrormessage("Uzupełnij puste pole!");
      }

      if (isTitleValid === false) {
        console.log("Wypełnij formularz jeszcze raz");
      }

      return false;
    } else {
      setProduct({
        title: title,
        description: description,
        type: typeData,
        productCount: Number(productCount),
        model: model,
        price: Number(price),
        size: sizeData,
        color: color,
        image: image,
      });
      return true;
    }
  }

  function setTitleToProduct(event) {
    setTitle(event);
    if (event.length > 50) {
      setIsTitleValid(false);
      setTitleErorrMessage("Maksymalna długość teksu: 50");
    } else if (event.charAt(0) !== event.charAt(0).toUpperCase()) {
      setIsTitleValid(false);
      setTitleErorrMessage("Zacznij opis dużą literą");
    } else {
      setIsTitleValid(true);
      setTitle(event);
    }
  }

  function setDescriptionToProduct(event) {
    setDescription(event);
    if (event.length > 150) {
      setIsDescriptionValid(false);
      setDescriptionErrormessage("Maksymalna długość teksu: 150");
    } else if (event.charAt(0) !== event.charAt(0).toUpperCase()) {
      setIsDescriptionValid(false);
      setDescriptionErrormessage("Zacznij opis dużą literą");
    } else {
      setIsDescriptionValid(true);
      setDescription(event);
    }
  }

  function setProductCountToProduct(event) {
    setProductCount(event);
    if (
      !Number.isInteger(parseFloat(event) || !parseInt(event)) &&
      event.length !== 0
    ) {
      setProductCountValid(false);
      setProductCountErrormessage("Podaj liczbę całkowitą!");
    } else {
      setProductCountValid(true);
      setProductCount(event);
    }
  }

  function setModelToProduct(event) {
    setModel(event);
    if (event.length > 10) {
      setProductModelValid(false);
      setProductModelErrormessage("Maksymalna długość teksu: 10");
    } else {
      setProductModelValid(true);
      setModel(event);
    }
  }

  function setPriceToProduct(event) {
    setPrice(event);
    if ((!parseFloat(event) || !parseInt(event)) && event.length !== 0) {
      setProductPriceValid(false);
      setProductPriceErrormessage("Podaj liczbę!");
    } else {
      setProductPriceValid(true);
      setPrice(event);
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-7xl bg-white shadow-sm  mb-4 ">
        <Card.Body className="">
          <h1 className="text-2xl mb-10">Uzupełnij formularz</h1>
          <InputGroup
            hasValidation
            className="mb-3 p-2"
            style={{ width: "800px" }}
          >
            {" "}
            <InputGroup.Text>Nazwa</InputGroup.Text>
            <Form.Control
              value={title}
              name="nazwa"
              onChange={(event) => setTitleToProduct(event.target.value)}
              required
              isInvalid={!isTitleValid}
            />
            <Form.Control.Feedback type="invalid">
              {titleErrormessage}
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3 p-2 " style={{ width: "800px" }}>
            {" "}
            <InputGroup.Text>Opis</InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(event) => setDescriptionToProduct(event.target.value)}
              isInvalid={!isDescriptionValid}
            />
            <Form.Control.Feedback type="invalid">
              {descriptionErrormessage}
            </Form.Control.Feedback>
          </InputGroup>
          <div>
            <InputGroup className="mb-3 p-2">
              <InputGroup.Text>Wybierz typ</InputGroup.Text>
              <DropdownButton variant="outline-secondary" title={typeData}>
                {type.map((typee) => (
                  <Dropdown.Item key={typee} onClick={() => setTypeData(typee)}>
                    {typee}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
            <InputGroup className="mb-3 p-2">
              <InputGroup.Text>Wybierz rozmiar</InputGroup.Text>
              <DropdownButton variant="outline-secondary" title={sizeData}>
                {size.map((sizee) => (
                  <Dropdown.Item key={sizee} onClick={() => setSizeData(sizee)}>
                    {sizee}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </div>
          <div className="flex ">
            <InputGroup className="mb-3 p-2" style={{ width: "400px" }}>
              {" "}
              <InputGroup.Text>Ilosc</InputGroup.Text>
              <Form.Control
                value={productCount}
                onChange={(event) =>
                  setProductCountToProduct(event.target.value)
                }
                isInvalid={!isProductCountValid}
              />
              <Form.Control.Feedback type="invalid">
                {productCountErrormessage}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3 p-2" style={{ width: "400px" }}>
              {" "}
              <InputGroup.Text>Model</InputGroup.Text>
              <Form.Control
                value={model}
                onChange={(event) => setModelToProduct(event.target.value)}
                isInvalid={!isModelValid}
              />
              <Form.Control.Feedback type="invalid">
                {productModelErrormessage}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3 p-2" style={{ width: "400px" }}>
              {" "}
              <InputGroup.Text>Cena</InputGroup.Text>
              <Form.Control
                value={price}
                onChange={(event) => setPriceToProduct(event.target.value)}
                isInvalid={!isPriceValid}
              />
              <InputGroup.Text>zł</InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {productPriceErrormessage}
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3 p-2" style={{ width: "400px" }}>
              {" "}
              <InputGroup.Text>Kolor</InputGroup.Text>
              <Form.Control
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </InputGroup>
          </div>
          <InputGroup className="mb-3 p-2" style={{ width: "800px" }}>
            {" "}
            <InputGroup.Text>URL do zdjecia:</InputGroup.Text>
            <Form.Control onChange={(event) => setImage(event.target.value)} />
          </InputGroup>
          <Button ref={ref} className="mr-10" onClick={addTodata}>
            Dodaj
          </Button>
          <Button onClick={save}>Zapisz</Button>
          <Overlay
            show={!show}
            target={target}
            placement="left"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <Popover.Header as="h3" className="text-black">
                Błąd!
              </Popover.Header>
              <Popover.Body>
                <strong>Błąd zapisu - uzupełnij brakujące dane</strong>
              </Popover.Body>
            </Popover>
          </Overlay>
        </Card.Body>
      </Card>
    </>
  );
}
