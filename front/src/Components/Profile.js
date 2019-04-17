import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state  = {
            profile: {
                email:  "simone.veil@mail.fr",
                name:  "Simone",
                lastname:  "Veil"
            }
        }
    }

    handleClick(){
        console.log('disconnected');
   }
   
    render(){
        return(
            <div className="center">
                <div className="card">
                  <h1>Profile</h1>
                    <form >
                        <input className= "form-item"  type = "email" name = "email" value = {this.state.profile.email} />
                        <input className= "form-item"  type = "name" name = "name" value = {this.state.profile.name} />
                        <input className= "form-item"  type = "lastname" name = "password" value = {this.state.profile.lastname} />
                        <Link to="/signin">
                            <input className= "form-submit" value="DECONNECT" onClick={this.handleClick}/> 
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}


export default Profile;

