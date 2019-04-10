import React, { Component } from 'react'

import './SignUp.css';

class SignUp extends Component {
  constructor(props){
      super(props)
      this.state = {
        email: "sophie@email.fr",
        password: "badass",
        confirmPassword: "badass",
        firstName: "Marceau",
        lastName: "Sophie"
      }
  }

  handleSubmit = () => {
    console.log("A name was submitted: " + JSON.stringify(this.state, 1, 1));
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

  updateFirstNameField= (event) => {
    this.setState({firstName: event.target.value})
  }

  updateLastNameField = (event) => {
    this.setState({lastName: event.target.value})
  } 
 
    render() {
        return (
            <div className="center">
                <div className="card">
                  <h1>{JSON.stringify(this.state,1,1)}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input className= "form-item" placeholder= "FirstName" type = "text" name = "firstName" value = {this.state.firstName} onChange={this.updateFirstNameField} />
                        <input className= "form-item" placeholder= "LastName"  type = "text" name = "lastName" value = {this.state.lastName} onChange={this.updateLastNameField} />
                        <input className= "form-item" placeholder= "Email" type = "email" name = "email" value = {this.state.email} onChange={this.updateEmailField} />
                        <input className= "form-item" placeholder= "Password" type = "password" name = "password" value = {this.state.password} onChange={this.Field}/>
                        <input className= "form-item" placeholder= "confirmPassword" type = "password" name = "confirmPassword" value = {this.state.confirmPassword} onChange={this.updateConfirmPasswordField} />
                        <input className= "form-submit" value= "SUBMIT"/> 
                    </form>
                </div>
            </div>
    );
  }
}       

    export default SignUp;


    