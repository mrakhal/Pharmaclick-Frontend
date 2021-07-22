import React from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { authLogout } from '../action'

class LandingPage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }
        render() {
            return (
                <div className="container-fluid">
                    <h1>Test Landing Page {this.props.fullname}</h1>
                    <Button label="Logout" onClick={this.props.authLogout} />
                </div>
            );
        }
    }

const mapStateToProps = ({authReducer}) =>{
    return {
        ...authReducer
    }
}
export default connect(mapStateToProps, { authLogout })(LandingPage);