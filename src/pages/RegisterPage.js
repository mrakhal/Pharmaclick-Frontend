import React from 'react';
import doctorWoman from '../assets/illustration/doctor-woman.svg'
import doctorMan from '../assets/illustration/doctor-man.svg'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { URL_API } from '../Helper.js';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.showSticky = this.showSticky.bind(this);
        this.state = {
            password: '',
            username: '',
            email: '',
            nama: '',
            loading: false,
            invalid: ''
        }
    }

    showSticky = (messages, severity) => {
        this.toast.show({ severity: severity, summary: "Register Succes", detail: messages });
    }
    onBtnSignup = async () => {
        try {
            let { nama, username, email, password } = this.state
            if (nama == '' || username == '' || email == '' || password == '') {
                this.setState({ invalid: 'p-invalid' })
                this.msgs2.show({ severity: 'error', summary: 'Error: .', detail: `Fill all the form!`, sticky: true })
                return null
            } else {
                if ((email.includes(".com") || email.includes(".co.id")) && email.includes("@")) {
                    if (password.match(/a-z0-9/ig) && password.length > 6) {
                        let register = await axios.post(URL_API + '/user/register', { nama, username, email, password })
                        this.setState({ loading: true })
                        this.setState({ loading: false })
                        this.showSticky(register.data.messages, 'success')
                    } else {
                        this.msgs2.show({ severity: 'warn', summary: 'Invalid: ', detail: ' Invalid format password!', sticky: true })
                    }
                } else {
                    this.msgs2.show({ severity: 'warn', summary: 'Invalid: ', detail: ' Invalid format email!', sticky: true })
                }
            }

        } catch (error) {
            console.log("Error registration", error)
        }
    }
    render() {
        const footer = (
            <React.Fragment>
                <Divider />
                <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                    <li>At least one alphabete</li>
                    <li>At least one numeric</li>
                    <li>Minimum 6 characters</li>
                </ul>
            </React.Fragment>
        );
        let { nama, username, email, password, invalid } = this.state
        return (
            <div className="container-fluid" style={{ height: '95vh', width: '100%', backgroundImage: 'linear-gradient(to bottom, white , #f0edfe)', overflow: 'hidden' }}>
                <Toast ref={(el) => this.toast = el} />
                <div className="row " style={{ width: '92%', height: '75vh', borderRadius: '30px', backgroundColor: 'white', boxShadow: '5px 5px 7px grey', margin: 'auto', marginTop: '50px' }}>
                    <div className="col-6 d-none d-md-flex justify-content-center align-items-center" style={{ padding: '0 60px', height: '100%', borderRadius: '30px', backgroundColor: '#3264d6' }}>
                        <img src={doctorWoman} style={{ height: '80%' }} />
                        <img src={doctorMan} style={{ height: '80%' }} />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center w-xs-100 w-sm-100 w-md-50" style={{ padding: '0 60px', height: '100%' }}>
                        <div>
                            <h2 style={{ fontFamily: 'Comfortaa, cursive' }}>Get started</h2>
                            <span style={{ fontSize: '12px', color: 'grey' }}>Already have an account?
                                <Link to="/login" style={{ color: '#2399f9', textDecoration: 'none', cursor: 'pointer' }}> Log in</Link>
                            </span>
                        </div>
                        <div>
                            <div className="p-fluid row">
                                <Messages ref={(el) => this.msgs2 = el} />
                                <div>
                                    <label className="p-d-block">Name</label>
                                    <InputText value={nama} onChange={(e) => this.setState({ nama: e.target.value })} />
                                    <small id="username1-help" className="p-d-block" style={{ fontSize: '10px' }}>Enter your full name </small>
                                </div>
                            </div>
                            <div className="p-fluid row">
                                <div className="p-field d-flex flex-column col-6 col-md-6">
                                    <label htmlFor="username1" className="p-d-block" style={{ fontSize: '20px' }}>Username</label>
                                    <InputText aria-describedby="username1-help" className="p-d-block" value={username} onChange={(e) => this.setState({ username: e.target.value })} />
                                    <small id="username1-help" className="p-d-block" style={{ fontSize: '10px' }}>Enter your username. </small>
                                </div>
                                <div className="p-field d-flex flex-column col-6 col-md-6">
                                    <label htmlFor="username1" className="p-d-block">Email</label>
                                    <InputText id="username1" aria-describedby="username1-help" className="p-d-block" value={this.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                    <small id="username1-help" className="p-d-block" style={{ fontSize: '10px' }}>Enter your email. </small>
                                </div>
                            </div>
                            <div className="p-fluid row">
                                <div>
                                    <label htmlFor="username1" className="p-d-block">Password</label>
                                    <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} footer={footer} toggleMask />
                                    <small id="username1-help" className="p-d-block" style={{ fontSize: '10px' }}>Enter your password. </small>
                                </div>
                            </div>
                            <Button label="Sign Up" className="p-button-warning my-2" onClick={this.onBtnSignup} loading={this.state.loading} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;