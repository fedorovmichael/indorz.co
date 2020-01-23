import React, { useState } from 'react'
import { Container, TextField, Button, Grid } from '@material-ui/core'
import { postServer } from '../helpers/DataProvider'
import './Login.css'
import {useDispatch, useSelector } from 'react-redux'
import {isLoginUser, showAlert} from '../actions/index'
import SnackbarsCustom from './SnackbarsCustom'

const Login = (props) => {   
    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    let alert = useSelector(state => state.alertState.alert)

    const onLogin = async () => {
        const usString = localStorage.getItem("user")       
        const user = {login: login, password: password, userdb: usString}
        const loginResponce = await postServer('login', JSON.stringify(user)).then(res => res.data)        
        if(loginResponce.success){
            updateLocalStorage('isLogin', true)
            dispatch(isLoginUser(true))
            dispatch(showAlert({text: 'login user success', variant: 'success', show: true, event: onAlertClose}))
            props.history.push('/')
        }else{
            dispatch(showAlert({text: 'login user failed', variant: 'error', show: true, event: onAlertClose}))
            updateLocalStorage('isLogin', false)
        }
        console.log('login result: ', loginResponce)
    }

    const onResetLogin = () => {
        //const user = {login: login, password: password}
        //send to server
    }

    const updateLocalStorage = (key, value) => {
        let valueJson = JSON.stringify(value)
        localStorage.removeItem(key)
        localStorage.setItem(key, valueJson)
      }

    const  onAlertClose = () => {
        dispatch(showAlert({text: '', variant: 'success', show: false, event: ''}));
    }
    
    return (
        <Container className='display-f justifyCo-c'>
            {alert.show ? 
                <SnackbarsCustom data={alert} />
                :''
            }
            <Grid container spacing={3} className='wrapper-login'>
                <Grid item md={12} sd={12}>
                    <TextField className='input' value={login} onChange={(e)=>{ setLogin(e.target.value) }} label="Email" />
                </Grid>
                <Grid item md={12} sd={12}>
                    <TextField className='input' value={password} type="password" onChange={(e)=>{ setPassword(e.target.value) }} label="Password" />
                </Grid>
                <Grid item md={12} sd={12}>
                    <Button onClick={onLogin}>Login</Button>                    
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login