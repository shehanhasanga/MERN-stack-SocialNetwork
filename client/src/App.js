import React,{Fragment} from 'react';
import './App.css';
import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';

const App=()=> (
<Router>
  <Fragment>
    <Navbar/>
    <Route exact path='/' component ={Landing}></Route>
    <section className="container">
      <Switch>
      <Route exact path='/register' component ={Register}></Route>
      <Route exact path='/login' component ={Login}></Route>

      </Switch>
    </section>
  </Fragment>
</Router>
);
  
export default App;
