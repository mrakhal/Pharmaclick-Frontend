import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  CardText,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
import HTTP from "../service/HTTP.js";

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyTransactions: [],
      modal: false,
      detailTransactions: [],
    };
    // this.getValueInput = this.getValueInput.bind(this);
  }

  componentDidMount = () => {
    this.getTransactionHistory();
    // this.getDetailTransactions();
  };

  getDetailTransactions = (idtransaction) => {
    HTTP.get(`/user/detail-transactions/${idtransaction}`)
      .then((res) => {
        this.setState({
          detailTransactions: res.data,
          modal: !this.state.modal,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printModal = () => {
    return (
      <>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <Container>
              <Row>
                <div className="d-flex justify-content-between ">
                  <p></p>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.setState({ modal: !this.state.modal });
                    }}
                  >
                    X
                  </Button>
                </div>
                <hr className="mt-3" />
                {this.state.detailTransactions.slice(0, 1).map((item, idx) => {
                  return (
                    <>
                      {" "}
                      <Col md="6">
                        <p>
                          Recipient : <br />
                          {item.recipient}
                        </p>
                      </Col>
                      <Col md="6">
                        <p>
                          Address : <br />
                          {item.address}, {item.postal_code}
                        </p>
                      </Col>
                    </>
                  );
                })}

                <Col md="6"></Col>
              </Row>
            </Container>
            <hr />
            <Container>
              <Row>
                {this.state.detailTransactions.map((item, idx) => {
                  return (
                    <>
                      <Col md="4">
                        <img src={item.image_url} width="100%" />
                      </Col>
                      <Col md="8 mt-3">
                        <p>
                          <strong>{item.product_name}</strong>
                          <br />
                          {item.brand}
                        </p>
                        <p>
                          Rp.{item.pack_price.toLocaleString()} X {item.qty_buy}
                        </p>
                      </Col>
                      <hr />
                    </>
                  );
                })}
              </Row>
            </Container>
            <Container>
              <Row>
                {this.state.detailTransactions.splice(0, 1).map((item, idx) => {
                  return (
                    <>
                      <Col md="4">Total</Col>
                      <Col md="8">Rp.{item.total_price.toLocaleString()}</Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </>
    );
  };

  getTransactionHistory = () => {
    if (this.statusTrans.value) {
      let value = `?id_transaction_status=${this.statusTrans.value}`;

      HTTP.get(`/user/sort-transactions${value}`)
        .then((res) => {
          this.setState({
            historyTransactions: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let value = ``;

      HTTP.get(`/user/sort-transactions${value}`)
        .then((res) => {
          this.setState({
            historyTransactions: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    console.log("waw", this.state.historyTransactions);
    console.log("detran", this.state.detailTransactions);
    return (
      <Col md="10 mt-5">
        <Container>
          {this.printModal()}
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="exampleSelect">Sort By</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  innerRef={(e) => (this.statusTrans = e)}
                  onClick={this.getTransactionHistory}
                >
                  <option value={4}>Request</option>
                  <option value={1}>On Progress</option>
                  <option value={2}>Done</option>
                  <option value={3}>Reject</option>
                </Input>
              </FormGroup>
            </Col>

            {this.state.historyTransactions.map((item) => {
              return (
                <>
                  <Col md="12">
                    <Card
                      body
                      style={{
                        borderRadius: "15px",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        marginTop: "1%",
                        border: "none",
                      }}
                    >
                      <Container>
                        <Row>
                          <Col md="4">
                            <CardTitle tag="h6">Invoice</CardTitle>
                            <CardText>{item.invoice}</CardText>
                          </Col>
                          <Col md="3">
                            <CardTitle tag="h6">Recipient Name</CardTitle>
                            <CardText>{item.recipient}</CardText>
                          </Col>
                          <Col md="2">
                            <CardTitle tag="h6">Status</CardTitle>
                            <CardText>{item.status_name}</CardText>
                          </Col>
                          <Col
                            md="3"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              color="warning"
                              onClick={() => {
                                this.getDetailTransactions(item.id);
                              }}
                            >
                              Detail
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
      </Col>
    );
  }
}

export default TransactionPage;
