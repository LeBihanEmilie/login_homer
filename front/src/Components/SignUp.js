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


//   updateConfirmPassword= (event) => {
//       this.setState({confirmPassword: event.target.value})
//   }

//   updatePassword= (event) => {
//     this.setState({password: event.target.value})
// }

//   updateFirstName= (event) => {
//     this.setState({firstName: event.target.value})
//   }

//   updateLastName = (event) => {
//     this.setState({lastName: event.target.value})
//   } 
 
    render() {
        return (
            <div className="center">
                <div className="card">
                  <h1>{JSON.stringify(this.state,1,1)}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input className= "form-item" placeholder= "FirstName" type = "text" name = "firstName" value = {this.state.firstName} onChange={this.updateFirstName} />
                        <input className= "form-item" placeholder= "LastName"  type = "text" name = "lastName" value = {this.state.lastName} onChange={this.updateLastname} />
                        <input className= "form-item" placeholder= "Email" type = "email" name = "firstName" value = {this.state.email} onChange={this.updateEmail} />
                        <input className= "form-item" placeholder= "Password" type = "password" name = "password" value = {this.state.password} onChange={this.updatePassword}/>
                        <input className= "form-item" placeholder= "confirmPassword" type = "password" name = "confirmPassword" value = {this.state.confirmPassword} onChange={this.updateConfirmPassword} />
                        <input className= "form-submit" value= "SUBMIT"/> 
                    </form>
                </div>
            </div>
    );
  }
}       

    export default SignUp;


    