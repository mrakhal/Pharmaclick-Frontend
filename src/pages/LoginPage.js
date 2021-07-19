import React from 'react';
import drug from '../assets/illurstration/drugs.svg'
import remoteWork from '../assets/illurstration/remote-work-man.svg'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Link, Redirect } from 'react-router-dom';
import { Password } from 'primereact/password';
import axios from 'axios';
import { URL_API } from '../Helper';
import { connect } from 'react-redux';
import { authLogin } from '../action/AuthAction';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            invalidEmail: false,
            invalidPassword: false
        }
    }

    onBtnLogin = async () => {
        try {
            let { email, password } = this.state
            this.setState({loading: true})
            await this.props.authLogin(email, password)
            if (this.props.response == 400) {
                if (this.props.messages.match(/password/ig)) {
                    this.setState({ invalidPassword: true, loading: false })
                    setTimeout(() => {
                        this.setState({ invalidPassword: false, password: '' })
                    }, 3000);
                } else if (this.props.messages.match(/register/ig)) {
                    this.setState({ invalidEmail: true, loading: false })
                    setTimeout(() => {
                        this.setState({ invalidEmail: false, email: '', password: '' })
                    }, 3000);
                } else if (this.props.messages.match(/verif/ig)){
                    this.msgs.show({severity: 'warn', summary: 'Warning -- ', detail: this.props.messages, sticky: true})
                    this.setState({loading: false})
                }
            }
        } catch (error) {
            this.setState({ invalidPassword: true, loading: false })
            setTimeout(() => {
                this.setState({ invalidPassword: false, password: '' })
            }, 3000);
            console.log("error login", error)
        }
    }


    render() {
        let { email, password, loading, invalidEmail, invalidPassword } = this.state
        if (this.props.iduser) {
            return <Redirect to="/" />
        }

        return (
            <div className="container-fluid" style={{ height: '100vh' }}>

                <div className="row" style={{ height: '100%', width: '100vw' }} >
                    <div className="col-sm-12 col-lg-6 d-flex flex-column align-items-center justify-content-center" >
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ backgroundImage: 'linear-gradient(to right, #56b1ff , #1994f7)', padding: '10%', boxShadow: '10px 10px 5px grey', width: '100%' }}>
                            <img src={drug} style={{ height: '45px' }} />
                            <h1 className="my-3" style={{ fontFamily: 'Open Sans, sans-serif', color: 'white', fontWeight: 'bolder' }}>Welcome!</h1>
                            <p style={{ color: 'white' }}>Log In to Your Account. Dont have any account? <Link to="/register" style={{ color: '#fec107', textDecoration: 'none' }}>Sign up</Link></p>
                            <Messages ref={(el) => this.msgs = el} />
                            <div className="p-fluid row">
                                <div className="p-field d-flex flex-column col-12 col-md-6">
                                    <label className="p-d-block mb-2 ml-4" style={{ fontSize: '20px', color: 'white' }}>Email</label>
                                    <InputText value={email} onChange={(e) => this.setState({ email: e.target.value })} style={{ border: '1px solid white', borderRadius: '30px' }} placeholder="   Your email ..." />
                                    {
                                        invalidEmail && <p className="ml-4 " style={{ fontSize: '12px', color: 'red' }}>Email not registered</p>
                                    }
                                </div>
                                <div className="p-field d-flex flex-column col-12 col-md-6">
                                    <label className="p-d-block mb-2" style={{ fontSize: '20px', color: 'white', position: 'relative', left: '18px' }}>Password</label>
                                    <Password value={password} onChange={(e) => this.setState({ password: e.target.value })} inputStyle={{ border: '1px solid white', borderRadius: '30px' }} feedback={false} toggleMask placeholder="   Your password ..." />
                                    {
                                        invalidPassword && <p className="ml-4" style={{ fontSize: '12px', color: 'red' }}>Wrong password!</p>
                                    }
                                </div>
                            </div>
                            <Button color="warning" className='mt-2' onClick={this.onBtnLogin} loading={loading}>Login</Button>

                        </div>
                    </div>
                    <div className="col-md-12 col-lg-6 d-none d-md-flex flex-column align-items-center justify-content-center" style={{ overflowY: 'hidden', height: '100%', position: 'relative', overflowX: 'hidden' }}>
                        <div style={{ backgroundColor: '#3362d5', height: '500px', width: '500px', borderRadius: '100%', position: 'absolute', top: '-50%', left: '75%' }}></div>
                        <div style={{ backgroundColor: '#3362d5', height: '50px', width: '50px', borderRadius: '100%', position: 'absolute', top: '10%', right: '40%' }}></div>
                        <img src={remoteWork} className="w-50" style={{ position: 'absolute' }} />
                        <div style={{ backgroundColor: '#3362d5', height: '500px', width: '500px', borderRadius: '100%', position: 'absolute', top: '70%', left: '40%' }}></div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}
export default connect(mapStateToProps, { authLogin })(LoginPage);