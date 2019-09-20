import React,{Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email:'',
          password:'',
          password2:''
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
        const {name,email,password,password2}=this.state;
        if(password!==password2){
            console.log("password not matched");
        }else{
          console.log("password matched");
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
      }
      render() {
        return (
            <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" onChange={this.handleChange}  required/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
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
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    onChange={this.handleChange} 
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
        );
      }
}

export default register;