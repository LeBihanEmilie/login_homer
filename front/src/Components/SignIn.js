import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SignUp.css';

class SignIn extends Component {
  constructor(props){
      super(props)
      this.state = {
        email: "",
        password: "",
      }
  }
 
    render() {
        return (
            <div className="signin">
                <Link to="/signup">Sign Up</Link>
                <Link to="/profile">Profile</Link>
                    <div className="center">
                        <div className="card">
                        <h1>Sign In</h1>
                            <form >
                                <input className= "form-item" placeholder= "Email" type = "email" name = "email" value = {this.state.email} onChange={this.updateEmailField} />
                                <input className= "form-item" placeholder= "Password" type = "password" name = "password" value = {this.state.password} onChange={this.updatePasswordField}/>
                                <input className= "form-submit" value="SUBMIT" onClick={this.handleSubmit} /> 
                            </form>
                        </div>
                    </div>
            </div>
    );
  }
}       

    export default SignIn;

 