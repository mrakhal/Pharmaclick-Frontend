import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { keepLogin, getCity } from "../action";
import "../assets/css/CartPage.css";
import HTTP from "../service/HTTP";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, dataCost: [] };
  }

  componentDidMount() {
    this.props.getCity();
  }

  printChooseAddress = () => {
    return (
      <>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={() => {
            this.setState({ modal: !this.state.modal });
          }}
        >
          {/* <ModalHeader
            toggle={() => {
              this.setState({ modal: !this.state.modal });
            }}
          >
            Modal title
          </ModalHeader> */}
          <ModalBody>
            {this.props.user.address.map((item) => {
              return (
                <>
                  <Container className="transaction-order py-5 mt-2">
                    <Row>
                      <Col md="3">{item.tag}</Col>
                      <Col md="7">
                        <p>{item.recipient}</p>
                        <p>
                          {item.address},{item.postal_code}
                        </p>
                      </Col>
                      <Col md="2">
                        <Button outline color="primary">
                          SELECT
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </>
              );
            })}
          </ModalBody>
        </Modal>
      </>
    );
  };

  onBtnIncrement = async (qtyIn, idproductIn, iduserIn, priceIn) => {
    try {
      let qty = parseInt(qtyIn);
      let idproduct = idproductIn;
      let iduser = iduserIn;
      let price = parseInt(priceIn);
      let res = await HTTP.patch(`/product/increment`, {
        qty: qty,
        idproduct: idproduct,
        iduser: iduser,
        price: price,
      });
      if (res.data) {
        this.props.keepLogin(localStorage.getItem("tkn_id"));
      }
    } catch (error) {
      console.log("Increment Error", error);
    }
  };

  onBtnDecrement = (qtyIn, idproductIn, iduserIn, priceIn) => {
    let qty = parseInt(qtyIn);
    let idproduct = idproductIn;
    let iduser = iduserIn;
    let price = parseInt(priceIn);
    HTTP.patch(`/product/decrement`, {
      qty: qty,
      idproduct: idproduct,
      iduser: iduser,
      price: price,
    })
      .then((res) => {
        let token = localStorage.getItem("tkn_id");
        this.props.keepLogin(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  shippingCost = () => {
    HTTP.post(`/ongkir/cost`, {
      origin: this.originIn.value,
      destination: 55,
      weight: 1000,
    })
      .then((res) => {
        this.setState({ dataCost: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("user", this.props.user);
    return (
      <Container className="p-5" style={{ backgroundColor: "#F7F7F7" }} fluid>
        <Row>
          <Col md="12 mt-5">
            <h4>Shopping Cart</h4>
          </Col>
          <Col md="8 mt-3">
            {/* FOR ADDRESS */}
            {this.props.user.address.length > 0 ? (
              <>
                <Container>
                  <Row>
                    <Col md="12" className="title-address">
                      <Container>
                        <Row className="mt-3">
                          <Col md="1">
                            <a>1</a>
                          </Col>
                          <Col md="10">
                            <p>SHIPPING ADDRESS</p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    {/* FORM ADDRESS */}
                    <Col md="12 mt-3 pb-3" className="title-address">
                      <Container>
                        <Row className="mt-3">
                          <Col md="6">
                            <FormGroup>
                              <Label for="recipient">Recipient Name</Label>
                              <Input
                                type="text"
                                name="recipient"
                                id="recipient"
                                placeholder="Enter recipient name"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label for="postalCode">Postal Code</Label>
                              <Input
                                type="number"
                                name="postalCode"
                                id="postalCode"
                                placeholder="Enter your postal coded"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6 mt-3">
                            <FormGroup>
                              <Label for="city" tag="span">
                                City
                              </Label>
                              <Input
                                type="select"
                                name="select"
                                className="form-inputan"
                                id="city"
                                onChange={this.shippingCost}
                                innerRef={(e) => (this.originIn = e)}
                                required
                              >
                                {this.props.city.map((item) => {
                                  return (
                                    <>
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="6 mt-3">
                            <FormGroup>
                              <Label for="aaddress">Address</Label>
                              <Input
                                type="textarea"
                                name="aaddress"
                                id="aaddress"
                                placeholder="Enter your address"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    {/* END FORM ADDRESS */}
                  </Row>
                </Container>

                {/* SHIPPING COST */}
                <Container>
                  <Row>
                    <Col md="12 mt-3" className="title-address">
                      <Container>
                        <Row className="mt-3">
                          <Col md="1">
                            <a>2</a>
                          </Col>
                          <Col md="10">
                            <p>SHIPPING COST</p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    {/* FORM ADDRESS */}
                    <Col md="12 mt-3 pb-3" className="title-address">
                      <Container>
                        <Row className="mt-3">
                          <Col md="6">
                            <FormGroup>
                              <Label for="recipient">Recipient Name</Label>
                              <Input
                                type="text"
                                name="recipient"
                                id="recipient"
                                placeholder="Enter recipient name"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label for="postalCode">Postal Code</Label>
                              <Input
                                type="number"
                                name="postalCode"
                                id="postalCode"
                                placeholder="Enter your postal coded"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6 mt-3">
                            <FormGroup>
                              <Label for="city" tag="span">
                                City
                              </Label>
                              <Input
                                type="select"
                                name="select"
                                className="form-inputan"
                                id="city"
                                innerRef={(e) => (this.cityIn = e)}
                                required
                              >
                                {this.props.city.map((item) => {
                                  return (
                                    <>
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    </>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="6 mt-3">
                            <FormGroup>
                              <Label for="aaddress">Address</Label>
                              <Input
                                type="textarea"
                                name="aaddress"
                                id="aaddress"
                                placeholder="Enter your address"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    {/* END FORM ADDRESS */}
                  </Row>
                </Container>
                <div class="btn-transaction mt-5">
                  <center>
                    <a>Checkout</a>
                  </center>
                </div>
              </>
            ) : (
              <>
                <Container className="transaction-order py-5 mt-1">
                  <Row>
                    {this.printChooseAddress()}
                    <Col md="2">Address</Col>
                    <Col md="8">Address</Col>
                    <Col md="2">
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          this.setState({ modal: !this.state.modal });
                        }}
                      >
                        CHANGE
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </>
            )}

            {/* <Container className="transaction-order py-5">
              <Row>
                <Col md="2">w</Col>
                <Col md="8">w</Col>
                <Col md="2">
                  <Button outline color="primary">
                    CHANGE
                  </Button>
                </Col>
              </Row>
            </Container> */}
          </Col>
          <Col md="4 mt-3">
            <Card style={{ border: "none", borderRadius: "15px" }}>
              <CardBody>
                <Container>
                  <Row>
                    <Col md="12 ml-3 mb-5">
                      <h6>Your Order</h6>
                    </Col>
                    {this.props.user.cart.map((item) => {
                      return (
                        <>
                          <Col md="4">
                            <img src={item.image_url} width="100%" />
                          </Col>
                          <Col md="8">
                            <strong>{item.product_name}</strong>
                            <div className="d-flex cart-order">
                              <Button
                                outline
                                color="primary"
                                onClick={() => {
                                  this.onBtnIncrement(
                                    item.qty,
                                    item.idproduct,
                                    item.iduser,
                                    item.price
                                  );
                                }}
                              >
                                +
                              </Button>
                              <Input
                                type="text"
                                value={item.qty}
                                style={{
                                  width: "60px",
                                  textAlign: "center",
                                }}
                                disabled
                              />
                              <Button
                                outline
                                color="danger"
                                onClick={() => {
                                  this.onBtnDecrement(
                                    item.qty,
                                    item.idproduct,
                                    item.iduser,
                                    item.price
                                  );
                                }}
                              >
                                -
                              </Button>
                            </div>
                            <div className="price-order">
                              <p>Rp {item.price.toLocaleString()}</p>
                            </div>
                          </Col>
                          <hr className="divide-order" />
                        </>
                      );
                    })}
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    user: authReducer,
    city: productReducer.city_list,
  };
};

export default connect(mapStateToProps, { keepLogin, getCity })(CartPage);
