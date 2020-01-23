import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom' 
import Login from './components/Login'
import { Registration } from './components/Registration'
import { NavBar } from './components/NavBar'
import Home from './components/Home'
import {useSelector,  useDispatch } from 'react-redux'
import {setUser, isLoginUser} from './actions/index'

export const App = () => {

  let user = useSelector(state => state.userState.user)
  let dispatch = useDispatch()
  
  useEffect(()=>{ 
    //console.log("user app 1: ", user)   
    if(user === null){
      //console.log("user app 2: ", user)
      let usString = localStorage.getItem("user")
      let isLogin = localStorage.getItem("isLogin") === 'true'? true : false
      //console.log("user app 3: ", usString)
      user = JSON.parse(usString)
      dispatch(setUser(user))
      dispatch(isLoginUser(isLogin))
      //isLoginUser
      //console.log("user app 4: ", user)
    }
  })

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path='/' component = {(routeProps) => <Home {...routeProps}/> }/>
        <Route path='/login' component = {(routeProps) => <Login {...routeProps}/> }/>
        <Route path='/registration'  component = {(routeProps) => <Registration {...routeProps}/> }/>        
      </div>
    </BrowserRouter>
  );
}


