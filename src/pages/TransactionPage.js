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
} from "reactstrap";
import HTTP from "../service/HTTP.js";

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyTransaction: [] };
  }

  componentDidMount = () => {
    this.getTransactionHistory();
  };

  filterTransaction = () => {};

  getTransactionHistory = () => {
    HTTP.get(`/product/sort`)
      .then((res) => {
        this.setState({ historyTransaction: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log("waw", this.state.historyTransaction);
    return (
      <Col md="10 mt-5">
        <Container>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  innerRef={(e) => (this.statusTrans = e)}
                  //   onChange={this.getTransactionHistory}
                >
                  <option value={4}>Request</option>
                  <option value={1}>On Progress</option>
                  <option value={2}>Done</option>
                  <option value={3}>Reject</option>
                </Input>
              </FormGroup>
            </Col>
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
                    <Col md="3">
                      <CardTitle tag="h6">dwadaw</CardTitle>
                      <CardText>dwadwa</CardText>
                    </Col>
                    <Col md="3">
                      <CardTitle tag="h6">Tanggal Kirim</CardTitle>
                      <CardText>wadad</CardText>
                    </Col>
                    <Col md="3">
                      <CardTitle tag="h6">Status Pengiriman</CardTitle>
                      <CardText></CardText>
                    </Col>
                    <Col
                      md="3"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button color="warning">Detail</Button>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }
}

export default TransactionPage;
