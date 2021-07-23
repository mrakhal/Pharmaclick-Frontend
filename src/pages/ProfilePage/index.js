import React from "react";
import { Container, Row, Col } from "reactstrap";

import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/css/profilePage.css";
import Profile from "../../assets/images/profile.png";
import ProfileComp from "./profileComp";
import axios from "axios";
import { URL_API } from "../../Helper";
import { connect } from "react-redux";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: Profile,
      isOpen: false,
      indexActive: 1,
      iduser: 4,
    };
  }

  componentDidMount() {
    let list = document.querySelectorAll(`.list`);
    for (let i = 0; i < list.length; i++) {
      list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
          list[j++].className = "list";
        }
        list[i].className = "list active";
      };
    }
  }

  // saveUserData = () => {
  //   let formData = new FormData();
  //   let data = {
  //     iduser: this.props.user.iduser,
  //     fullName: this.props.fullNameIn.value,
  //     gender: this.props.genderIn.value,
  //     email: this.emailIn.value,
  //     phone_number: this.phoneNumberIn.value,
  //     age: parseInt(this.ageIn.value),
  //   };
  //   formData.append("data", JSON.stringify(data));
  //   formData.append("images", this.state.fileUpload);

  //   axios
  //     .patch(URL_API + `/user/patch-user`, formData)
  //     .then((res) => {
  //       this.getAnImages();
  //       this.props.getImageProfileUser(this.props.user.iduser);
  //       this.setState({
  //         alert1: !this.state.alert1,
  //         color1: "success",
  //         message1: res.data.message,
  //       });
  //       setTimeout(() => {
  //         this.setState({
  //           alert1: !this.state.alert1,
  //         });
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    console.log("address", this.props.address);
    return (
      <Container className="mt-5">
        <Row>
          {/* Sidebar */}
          <Col md="2">
            <Container fluid>
              <Row>
                <Col md="12 p-0">
                  <div className="navigation">
                    <ul>
                      <li
                        class="list active"
                        onClick={() => {
                          this.setState({
                            indexActive: 1,
                          });
                        }}
                      >
                        <b></b>
                        <b></b>
                        <a href="#">
                          <span className="icon">
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <span className="title">Profile</span>
                        </a>
                      </li>
                      <li class="list">
                        <b></b>
                        <b></b>
                        <a
                          href="#"
                          onClick={() => {
                            this.setState({
                              indexActive: 2,
                            });
                          }}
                        >
                          <span className="icon">
                            <FontAwesomeIcon icon={faKey} />
                          </span>
                          <span className="title">Security</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>

          {/* IMAGE USER */}
          {this.state.indexActive === 1 ? (
            <>
              <ProfileComp
              // data={{ saveUserData: this.saveUserData.bind(this) }}
              />
            </>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    user: authReducer,
    city: productReducer.city_list,
    profile: productReducer.image_profile,
  };
};

export default connect(mapStateToProps)(ProfilePage);
