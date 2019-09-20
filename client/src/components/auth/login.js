import React,{Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        
      }
      async handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        const {email,password}=this.state;
       
            // const newuser = {
            //   name ,email , password
            // }
            // try{
            //     const config ={
            //       headers: {
            //         'Content-Type':'application/json'
            //       }
            //     }
            //     const body = JSON.stringify(newuser);
            //     const res =await axios.post('api/users',body,config);
            //     console.log(res.data);
            // }catch(err){
            //     console.error(err.response.data)
            // }
      
      }
      render() {
        return (
            <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In Your Account</p>
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" onChange={this.handleChange}  required/>
               
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={this.handleChange} 
                    required
                />
                </div>
            
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
               Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
        );
      }
}

export default login;