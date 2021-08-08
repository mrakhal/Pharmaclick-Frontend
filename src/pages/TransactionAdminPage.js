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
  ModalBody,CardBody,Pagination,PaginationItem,PaginationLink
} from "reactstrap";
import HTTP from "../service/HTTP.js";
import Upload from "../assets/images/bg-upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/TransactionPage.css";
import { URL_API } from "../Helper";
import axios from "axios";
import { connect } from "react-redux";

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
      todosPerPage: 5,
    };
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
                      {item.idtype === 1 ? (<><Col md="4">
                          <img src={item.image_url} width="100%" />
                        </Col>
                        <Col md="8 mt-3">
                          <p>
                            <strong>{item.product_name}</strong>
                            <br />
                            {item.brand}
                          </p>
                          <p>
                          Shipping Cost : Rp.{item.shipping_cost.toLocaleString()}<br/>
                          Product : Rp.{item.pack_price.toLocaleString()} X {item.qty_buy}
                          </p>
                        </Col>
                        <hr /></>):(<><Col md="4">
                          <img src={item.image_url} width="100%" />
                        </Col>
                        <Col md="8 mt-3">
                          <p>
                            <strong>{item.product_name}</strong>
                            <br />
                            {item.brand}
                          </p>
                          <p>
                            Shipping Cost : Rp.{item.shipping_cost.toLocaleString()}<br/>
                            Product : Rp.{item.unit_price.toLocaleString()}/{item.unit} X {item.qty_buy_total_netto}
                          </p>
                        </Col></>)}  
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
                      <Col md="4"></Col>
                      <Col md="8">Total : Rp.{item.total_price.toLocaleString()}</Col>
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
    let token = localStorage.getItem("tkn_id");
    const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get(URL_API + `/user/sort-transactions`,headers)
        .then((res) => {
          this.setState({
            historyTransactions: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  confirmationTransaction = (id) =>{
      HTTP.patch(`/transaction/accept/${id}`)
      .then((res)=>{
          this.getTransactionHistory()
          this.setState({alertAccept:!this.state.alertAccept,
          alertMessage:res.data,
          color:"success"})
      }).catch((err)=>{
          console.log(err)
      })
  }

  rejectTransaction = (id) =>{
      HTTP.patch(`/transaction/reject/${id}`)
      .then((res)=>{
          this.getTransactionHistory()
          this.setState({alertAccept:!this.state.alertAccept,
          alertMessage:res.data,
          color:"success"})
      }).catch((err)=>{
          console.log(err)
      })
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
    for (
      let i = 1;
      i <= Math.ceil(this.state.historyTransactions.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
        <div class="main-content">
                <main>
                <Container className="pb-5"><Row>
      <Col md="8 mt-4">
        <Container>
          {this.printModal()}
          <Row>
            <h5>Transaction <hr/></h5>
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
                       
                                <Button className="mt-1"
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
                            ): item.status_name === "waiting" ?(
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
                                <Button className="mt-1"
                                  color="primary" 
                                onClick = {()=>{
                                    this.confirmationTransaction(item.id)
                                }}
                                >
                                  Accept
                                </Button>
                                 <Button
                                  color="danger"
                                  className="mt-1"

                                onClick = {()=>{
                                    this.rejectTransaction(item.id)
                                }}
                                >
                                  Reject
                                </Button>
                               
                              </div>
                                ): item.status_name === "reject" ? (
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
                                className="mt-1"
                                color="danger" 
                                disabled
                                >
                                Rejected
                                </Button></div>
                                ):(
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
                                className="mt-1"
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
                            onClick={this.handleClick}
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
