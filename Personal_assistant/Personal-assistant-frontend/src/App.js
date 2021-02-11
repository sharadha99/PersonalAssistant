import React from 'react';
import Login from './Login';
import Register from './Register';
import AddTask from './AddTask';
import Userhome from './Userhome';
import Header from './Header';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
	
	return (
	<div>
		<Header />
		<Router> 	
			<Route path="/Login" component={Login} />
			<Route path="/Register" component={Register} />
			<Route path="/AddTask" component={AddTask} />
			<Route path="/Userhome" component={Userhome} />
		</Router>     
	</div>  
  );
}

export default App;
