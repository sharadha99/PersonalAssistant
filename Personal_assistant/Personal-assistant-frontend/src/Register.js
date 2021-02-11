import React from 'react';
import './Styles/Register.css';
import axios from 'axios';

class Register extends React.Component {

  constructor() {
    super();
    this.state = {
      fname: null,
      sname: null,
      num: null,
      tid: null,
      uid: null,
      passwd: null
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
	'fname':this.state.fname,
	'sname':this.state.sname,
	'num':this.state.num,
	'tid':this.state.tid,
	'uid':this.state.uid,
	'passwd':this.state.passwd	
	};
	console.log(opts);
	axios.post('http://127.0.0.1:5000/register',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
	if(res.data.success==true)
		window.location.replace('http://127.0.0.1:3000/Login')
    	}).catch(error => {
      	console.log(error);
    	})
	
	
}

  render() {
  return (
    <div>
    <div class="SubHeader">
      <h2 class="Heading">Register New User</h2>
    </div>
    <form class="Component" onSubmit={this.handleSubmit}>
      <div class="Field">
        <text class="Label">Name: </text>
        <input class="Input" name='fname' placeholder="First Name" onChange={this.handleChange}/>
        <input class="Input" name='sname' placeholder="Last Name" onChange={this.handleChange}/>
      </div>
      <div class="Field">
        <text class="Label">Phone Number: </text>
        <input class="Input" name="num" onChange={this.handleChange}/>
      </div>
      <div class="Field">
        <text class="Label">Email ID: </text>
        <input class="Input" name="tid" onChange={this.handleChange}/>
      </div>
      <div class="Field">
        <text class="Label">User Name: </text>
        <input class="Input" name="uid" onChange={this.handleChange}/>
      </div>
      <div class="Field">
        <text class="Label">Password: </text>
        <input class="Input" name="passwd" onChange={this.handleChange}/>
      </div>
      <div class="Field">
        <button class="Button">Register</button>
      </div>
    </form>
  </div>
  );
  }
}

export default Register;
