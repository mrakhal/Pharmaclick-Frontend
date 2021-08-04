import React from 'react';
import {Container,Row,Col,Button,Modal,ModalBody,FormGroup,Label,Input} from "reactstrap";
import { URL_API } from "../Helper";
import axios from "axios";
import "../assets/css/ManagementOrder.css"
import HTTP from "../service/HTTP.js";
import { connect } from "react-redux";
import { getProductAction } from "../action";

class ManagementOrderCustomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { historyTransactions:[],detailTransactions:[],modal:false,img_order:"",modalServe:false,products:[],product:[],userTransactions:[],shippingCost:[] }
    }

    componentDidMount() {
        this.props.getProductAction(2)
        this.getTransactionHistory()
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

    getTransactionHistory = (val) => {
        let vals = `&id=${val}`
        if(val){
            let token = localStorage.getItem("tkn_id");
            const headers = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            axios.get(URL_API + `/user/sort-transactions?idtype=2${vals}`,headers)
                .then((res) => {
                this.setState({      
                    userTransactions: res.data[0],
                });
                this.getShippingCost()
                })
                .catch((err) => {
                console.log(err);
                });
        }else{
            let token = localStorage.getItem("tkn_id");
            const headers = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            axios.get(URL_API + `/user/sort-transactions?idtype=2`,headers)
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

    onBtAddProducts = () => {
            this.state.products.push(null);
            this.setState({ products: this.state.products });

    };

    getShippingCost = (address) => {
     return HTTP.post(`/transaction/shipping-cost`, {
        origin: 22,
        destination: this.destinationForm.value,
        weight: 1000,
      })
        .then((res) => {
          this.setState({shippingCost:res.data})
        })
        .catch((error) => {
          return error;
        });
  };

    handleProducts = (e, index) => {
        HTTP.get(`/product/2?idproduct=${this.productVal.value}`)
        .then((res)=>{
            this.setState({product:res.data[0]})
        }).catch((err)=>{
            console.log(err)
        })
        this.state.products[index] = {idproduct:parseInt(this.productVal.value),netto:parseInt(this.qtyVal.value),unit:this.unitVal.value };
        this.setState({ products: this.state.products});
    };

    printProducts = () => {
        if (this.state.products.length >= 0) {
        return this.state.products.map((item, index) => {
            return (
            <Container fluid>
                <Row>
                    <Col md="6"><Label>Product Name</Label>
                        <Input type="select" name="select" id="exampleSelect" innerRef={(e) => (this.productVal = e)} onChange={(e) => this.handleProducts(e, index)}>
                                <option value={0}>Choose Product</option>
                                {this.props.products.map((item,idx)=>{
                                    return(<><option value={item.idproduct}>{item.product_name}</option></>)  
                                })}
                        </Input>
                    </Col>
                    <Col md="3"><Label>Netto</Label>
                        <Input type="number" name="select" id="exampleSelect" innerRef={(e) => (this.qtyVal = e)} onChange={(e) => this.handleProducts(e, index)}/>
                    </Col>
                    <Col md="3"><Label>Measure</Label>
                         <Input type="text" name="select" id="exampleSelect" innerRef={(e) => (this.unitVal = e)} value={this.state.product.unit} disabled />
                    </Col>
                </Row>
            </Container>
            );
        });
        }
    };

    printModalDetail = () => {
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
                    <Col md="12">
                        <img src={`${URL_API}/${this.state.img_order}`} width="100%" />
                    </Col>
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

    printModalServeProduct = () =>{
        return(
            <>
                <Modal isOpen={this.state.modalServe}>
                    <ModalBody>
                        <Container>
                            <Row>
                             <div className="d-flex justify-content-between ">
                    <p></p>
                    <Button
                        color="danger"
                        onClick={() => {
                        this.setState({ modalServe: !this.state.modalServe,products:[] });
                        }}
                    >
                        X
                    </Button>
                    </div>
                                <Col md="1">
                                    {/* {this.printProducts()} */}
                                    <Button
                                    color="success"
                                    type="button"
                                    size="sm"
                                    style={{ float: "right" }}
                                    onClick={this.onBtAddProducts}
                                    >
                                    +
                                    </Button>
                                </Col>
                                <Col md="11">{this.printProducts()}</Col>
                                <Col md="6 mt-2">
                                    <Label>Destination</Label>
                                    <Input type="select" name="select" id="exampleSelect" innerRef={(e) => (this.destinationForm = e)} disabled>
                                        <option value={this.state.userTransactions.id_city_destination}>{this.state.userTransactions.destination}</option>
                                    </Input>
                                </Col>
                                <Col md="6 mt-2">
                                    <Label>Postal Code</Label>
                                    <Input type="text" value={this.state.userTransactions.postal_code} innerRef={(e) => (this.postal_codeForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-2">
                                    <Label>Recipient</Label>
                                    <Input type="text" value={this.state.userTransactions.recipient} innerRef={(e) => (this.recipientForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-2">
                                    <Label>Note</Label>
                                    <Input type="text" value={this.state.userTransactions.note} innerRef={(e) => (this.noteForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-2">
                                    <Label>Address</Label>
                                    <Input type="textarea" value={this.state.userTransactions.address} innerRef={(e) => (this.addressForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-2">
                                    <Label>Shipping Cost</Label>
                                    <Input type="number" value={0} innerRef={(e) => (this.shippingCostForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-2">
                                    <Button color="primary" width="100%">Submit</Button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </>
        )
    }

    render() { 
        console.log('transaction history',this.state.userTransactions)
        console.log('detail history',this.state.detailTransactions)
        console.log('products',this.state.product)
        console.log('products props',this.props.products)
        console.log('user',this.props.user)
        console.log('shippingCost',this.state.shippingCost)
        return ( 
            <div className="main-content">
                    <main>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                {this.printModalDetail()}
                                {this.printModalServeProduct()}
                                    <div className="wrapper rounded">
                                        <nav className="navbar navbar-expand-lg navbar-dark dark d-lg-flex align-items-lg-start"> <a className="navbar-brand" href="#">Transactions <p className="text-muted pl-1">customer transactions</p> </a> 
                                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button> */}
                                        </nav>
                                        <div className="row mt-2 pt-2">
                                            <div className="col-md-6" id="income">
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <p className="pi pi-credit-card" style={{color:"white"}}></p>
                                                    <p className="text mx-3">Total Custom Order</p>
                                                    <p className="text-white money">{this.state.historyTransactions.length}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex justify-content-md-end align-items-center">
                                                    <div><i class="pi pi-user" style={{color:"white"}}></i></div>
                                                    <div className="text mx-3">{this.props.user.fullname}</div>
                                                    {/* <div className="text-white ml-4 money">{this.props.user.role}</div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <ul className="nav nav-tabs w-75">
                                                <li className="nav-item"> <a className="nav-link active" href="#history">History</a> </li>
                                                <li className="nav-item"> <a className="nav-link" href="#">Reports</a> </li>
                                            </ul> 
                                            {/* <button className="btn btn-primary">New Transaction</button> */}
                                        </div>
                                        <div className="table-responsive mt-3">
                                            <table className="table table-dark table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Invoice</th>
                                                        <th scope="col">Recipient</th>
                                                        <th scope="col">Note</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.historyTransactions.map((item,idx)=>{
                                          
                                                    return(
                                                        <tr className="title-table">
                                                        <td>{item.invoice} </td>
                                                        <td>{item.recipient}</td>
                                                        <td>{item.note}</td>
                                                        <td>{item.status_name}</td>
                                                        <td><Button outline color="primary" onClick={() => {
                                                            this.setState({ modal: !this.state.modal,img_order:item.img_order_url });
                                                            this.getDetailTransactions(item.id);
                                                        }}>Detail</Button>&nbsp;&nbsp;<Button outline color="success" 
                                                        onClick={async()=>{await this.getTransactionHistory(item.id);
                                                        this.setState({modalServe:!this.state.modalServe});
                                                        }}>Serve</Button></td>
                                                    </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center results"> <span className="pl-md-3">Showing<b className="text-white"> 1-1 0f 2 </b> trasactions</span>
                                            <div className="pt-3">
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                        <li className="page-item disabled"> <a className="page-link" href="#" aria-label="Previous"> <span aria-hidden="true">&lt;</span> </a> </li>
                                                        <li className="page-item"> <a className="page-link" href="#" aria-label="Next"> <span aria-hidden="true">&gt;</span> </a> </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                </div> 
                );
    }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    products: productReducer.product_list,
    user: authReducer,
    profile: productReducer.image_profile,
  };
};
 
export default connect(mapStateToProps,{ getProductAction})(ManagementOrderCustomPage);