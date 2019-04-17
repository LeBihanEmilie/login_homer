import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SignIn.css';

class SignIn extends Component {
  constructor(props){
      super(props)
      this.state = {
        email: "",
        password: "",
      }
  }
 
  handleSubmit = (event) => {
    fetch("http://localhost:5000/signin",
    {
        method:  'POST',
        headers:  new  Headers({
            'Content-Type':  'application/json'
        }),
        body:  JSON.stringify(this.state),
    })
    .then(res  =>  res.json())
    .then(
        res  =>  this.setState({"flash":  res.flash}),
        err  =>  this.setState({"flash":  err.flash}),
    )
  }

updatePasswordField= (event) => {
this.setState({password: event.target.value})
}

updateEmailField = (event) => {
    this.setState({email: event.target.value});
  }

  updateNameField = (event) => {
    this.setState({name: event.target.value})
  } 
 

    render() {
        return (
            <div className="signin">
                <div className="header">
                    <Link className="linkSignUp" to="/signup">Sign Up</Link>
                    <Link className="linkProfile" to="/profile">Profile</Link>
                </div>
                    <div className="center">
                        <div className="card">
                        <h1>Sign In</h1>
                            <form >
                                <input className= "form-item" placeholder= "email" type = "email" name = "email" value = {this.state.email} onChange={this.updateEmailField} />
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

 