import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SignUp.css';

class SignUp extends Component {
  constructor(props){
      super(props)
      this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
      }
  }

  handleSubmit = (event) => {
    fetch("http://localhost:5000/signup",
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

    updateEmailField = (event) => {
    this.setState({email: event.target.value});
  }

  updateConfirmPasswordField= (event) => {
      this.setState({confirmPassword: event.target.value})
  }

  updatePasswordField= (event) => {
    this.setState({password: event.target.value})
}

  updateFirstNameField = (event) => {
    this.setState({firstName: event.target.value})
  }

  updateLastNameField = (event) => {
    this.setState({lastName: event.target.value})
  } 
 
    render() {
        return (
          <div className="signup">
          <Link to="/signin">Sign Up</Link>
            <div className="center">
                <div className="card">
                  <h1>Sign Up</h1>
                    <form >
                        <input className= "form-item" placeholder= "FirstName" type = "text" name = "firstName" value = {this.state.firstName} onChange={this.updateFirstNameField} />
                        <input className= "form-item" placeholder= "LastName"  type = "text" name = "lastName" value = {this.state.lastName} onChange={this.updateLastNameField} />
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

    export default SignUp;


