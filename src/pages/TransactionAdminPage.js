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
  Alert,
  Modal,
  ModalBody, CardBody, Pagination, PaginationItem, PaginationLink, ModalHeader, Badge
} from "reactstrap";
import HTTP from "../service/HTTP.js";
import Upload from "../assets/images/bg-upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/TransactionPage.css";
import { URL_API } from "../Helper";
import axios from "axios";
import { connect } from "react-redux";
import { Dropdown } from 'primereact/dropdown';


class TransactionAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyTransactions: [],
      modal: false,
      modalUpload: false,
      detailTransactions: [],
      file: Upload,
      fileUpload: null,
      alertMessage: "",
      color: "",
      alertConfirm: false,
      idtransaction: null,
      currentPage: 1,
      todosPerPage: 4,
      selectedStatus: '',
      paymentProof: [],
      modalType: null
    };

    this.status = [
      { status_name: 'On Progress', code: 1 },
      { status_name: 'Done', code: 2 },
      { status_name: 'Reject', code: 3 },
      { status_name: 'Request', code: 4 },
      { status_name: 'Waiting', code: 5 }
    ];
  }

  componentDidMount() {
    this.getTransactionHistory();

  }

  getDetailTransactions = (idtransaction) => {
    HTTP.get(`/user/detail-transactions/${idtransaction}`)
      .then((res) => {
        this.setState({
          detailTransactions: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printModal = (modalType) => {
    if (modalType == 'Payment') {
      this.state.paymentProof[0] && console.log(`${URL_API}/${this.state.paymentProof[0].image_url}`)
      let url = this.state.paymentProof[0] ? `${URL_API}/${this.state.paymentProof[0].image_url}` : '/'
      return (
        <>
          <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: false, modalType: '' })}>
            <ModalHeader>
              <h5>Payment Proof</h5>
            </ModalHeader>
            <ModalBody className="d-flex flex-column justify-content-center align-items-center">
              <img src={url} />
              <div className="d-flex ">
                <Button color="success">Download Payment Proof</Button>
                <Button color="warning" className="ml-3" onClick={() => this.setState({ modal: false, modalType: '' })}>Close</Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      )
    }
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: false })}>
          <ModalBody>
            <Container>
              <Row>
                {/* <div className="d-flex justify-content-between ">
                  <p></p>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.setState({ modal: !this.state.modal });
                    }}
                  >
                    X
                  </Button>
                </div> */}
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

  getTransactionHistory = (status) => {
    let url = `/user/sort-transactions`
    if (status) {
      url += `?id_transaction_status=${status}`
    }
    HTTP.get(url)
      .then((res) => {
        this.setState({
          historyTransactions: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

  };

  confirmationTransaction = (id) => {
    HTTP.patch(`/transaction/accept/${id}`)
      .then((res) => {
        this.getTransactionHistory()
        this.setState({
          alertAccept: !this.state.alertAccept,
          alertMessage: res.data,
          color: "success"
        })
      }).catch((err) => {
        console.log(err)
      })
  }

  rejectTransaction = (id) => {
    HTTP.patch(`/transaction/reject/${id}`)
      .then((res) => {
        this.getTransactionHistory()
        this.setState({
          alertAccept: !this.state.alertAccept,
          alertMessage: res.data,
          color: "success"
        })
      }).catch((err) => {
        console.log(err)
      })
  }

  handleClick = (item) => {
    this.setState({ currentPage: item })
  }

  onDropdownChange = (e) => {
    this.setState({ selectedStatus: e.value })
    this.getTransactionHistory(e.value.code)
  }

  onBtnReset = () => {
    this.setState({ selectedStatus: null })
    this.getTransactionHistory()
  }

  getTransactionProof = async (idtransaction) => {
    try {
      let res = await HTTP.get(`/user/transfer-proof/${idtransaction}`)
      this.setState({ paymentProof: await res.data })
      console.log("TP-->", res.data)
    } catch (error) {
      console.log("error get trans proof", error)
    }
  }
  render() {
    const { currentPage, todosPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.state.historyTransactions.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.historyTransactions.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div class="main-content">
        <main>
          <Container className="pb-5" >
            <Row style={{ width: '100%' }}>
              <Col md="8 mt-4" style={{ width: '100%' }}>
                <Container >
                  {this.printModal(this.state.modalType)}
                  <Row >
                    <div className="d-flex justify-content-between">
                      <h5>Transaction </h5>
                      <hr />
                      <div>
                        <Dropdown value={this.state.selectedStatus} options={this.status} onChange={(e) => this.onDropdownChange(e)} optionLabel="status_name" placeholder="Filter by Status.." />
                        <Button onClick={this.onBtnReset} className="h-100 mx-2" color="primary">Reset</Button>
                      </div>
                    </div>
                    <Col md="12 mt-2">
                      <Alert isOpen={this.state.alertConfirm} color={this.state.color}>
                        {this.state.alertMessage}
                      </Alert>
                    </Col>
                    {currentTodos.map((item) => {
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
                              <Container >
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
                                  >
                                    <div>

                                    </div>
                                    {item.status_name === "request" ? (
                                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <Button
                                          color="warning"
                                          onClick={() => {
                                            this.setState({ modal: !this.state.modal });
                                            this.getDetailTransactions(item.id);
                                          }}
                                        >
                                          Detail
                                        </Button>

                                        <Button className="mt-1 mx-2"
                                          color="primary"
                                          disabled
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          color="danger"
                                          className="mt-1"
                                          disabled
                                        >
                                          Reject
                                        </Button>

                                      </div>
                                    ) : item.status_name === "waiting" ? (
                                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <Button color="warning" onClick={() => {
                                          this.setState({ modal: !this.state.modal });
                                          this.getDetailTransactions(item.id);
                                        }}
                                        >
                                          Detail
                                        </Button>
                                        <Button onClick={() => {
                                          this.setState({ modal: !this.state.modal, modalType: 'Payment' });
                                          this.getTransactionProof(item.id);

                                        }}
                                          className="ml-2"
                                        >
                                          Payment Proof
                                        </Button>
                                        <Button className="mt-1 mx-2"
                                          color="primary"
                                          onClick={() => {
                                            this.confirmationTransaction(item.id)
                                          }}
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          color="danger"
                                          className="mt-1"
                                          onClick={() => {
                                            this.rejectTransaction(item.id)
                                          }}
                                        >
                                          Reject
                                        </Button>

                                      </div>
                                    ) : item.status_name === "reject" ? (
                                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <Button
                                          color="warning"
                                          onClick={() => {
                                            this.setState({ modal: !this.state.modal });
                                            this.getDetailTransactions(item.id);
                                          }}
                                        >
                                          Detail
                                        </Button>
                                        <Button
                                          className="mt-1 ml-2"
                                          color="danger"
                                          disabled
                                        >
                                          Rejected
                                        </Button></div>
                                    ) : (
                                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <Button
                                          color="warning"
                                          onClick={() => {
                                            this.setState({ modal: !this.state.modal });
                                            this.getDetailTransactions(item.id);
                                          }}
                                        >
                                          Detail
                                        </Button>
                                        <Button
                                          className="mt-1 ml-2"
                                          color="primary"
                                          disabled
                                        >
                                          Accepted
                                        </Button></div>
                                    )}
                                  </Col>
                                </Row>
                              </Container>
                            </Card>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                  <Container className="mt-4">
                    <Row>
                      <Col md="4 m-auto" xs="9 m-auto" sm="4 m-auto">
                        <Pagination aria-label="Page navigation example">
                          <PaginationItem>
                            <PaginationLink first href="#" />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink previous href="#" />
                          </PaginationItem>
                          {pageNumbers.map((item) => {
                            return (
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  key={item}
                                  id={item}
                                  onClick={() => this.handleClick(item)}
                                >
                                  {item}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                        </Pagination>
                      </Col>
                    </Row>
                  </Container>
                </Container>
              </Col>
              {/* FILTER HERE */}
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer
  }
}
export default connect(mapStateToProps)(TransactionAdminPage);
