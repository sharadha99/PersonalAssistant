import React from 'react';
import './Styles/Login.css';
import axios from 'axios';
import Userhome from './Userhome';


class Login extends React.Component {

  constructor() {
    super();
	this.state={
		UserName: null,
		Password: null
	}
  }

handleChange = (task) => {
	task.preventDefault();
    	const { name, value } = task.target;
	console.log(name);
	this.setState({[name]: value});
}
handleSubmit = (task) =>{
	task.preventDefault();
	var opts={
    	"id":this.state.UserName,
    	"passwd":this.state.Password,
   	};
	//console.log(opts);
	console.log(opts.id);
	axios.post('http://127.0.0.1:5000/login',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
	if(res.data.success===true)
		window.location.replace('http://127.0.0.1:3000/Userhome');
    	}).catch(error => {
      	console.log(error);
    	})
	
	
}
  render() {
  return (
	<form onSubmit={this.handleSubmit}>     
		<div class="SubHeader">
			<h2 class="Heading">Login</h2>
		</div>  
		<div class="Component">
			<input class="Input" class="UserName" placeholder="UserName" name="UserName"  onChange={this.handleChange} />
			<br />
			<input class="Input" class="Password" placeholder="Password" name="Password" onChange={this.handleChange} />
			<br />
			<button class="Button" class="SignIn">Sign In</button>
			<br />    
			<a class="Register" href="http://127.0.0.1:3000/Register">New User? Register Here</a>
		</div>
    </form>	
  );
  }
}

export default Login;
