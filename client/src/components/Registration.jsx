import React, { useState } from 'react'
import { Container, Button, Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import { postServer, postServerCustomUrl } from '../helpers/DataProvider'
import './Registration.css'
import { useDispatch, useSelector } from 'react-redux'
import {setUser, isLoginUser, showAlert} from '../actions/index'
import SnackbarsCustom from './SnackbarsCustom'

export const Registration = (props) =>{
    const [name, setName] = useState('')
    const [role, setRole] = useState('user')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')       
    let dispatch = useDispatch()
    let alert = useSelector(state => state.alertState.alert)
    let user = useSelector(state => state.userState.user)

    const createUser = async ()=>{
        
        let arrNotValie = []


        if(name === ''){
            arrNotValie.push('name')
        }
        if(email === '' || !isValidEmail(email)){
            arrNotValie.push('email')
        }
        if(password === ''){
            arrNotValie.push('password')
        }

        if(arrNotValie.length > 0){
            const textAlert = 'Fields not valid: ' + arrNotValie.join(', ')
            dispatch(showAlert({text: textAlert, variant: 'error', show: true, event: onAlertClose}))
        }else{
        
            const userToSave = {
                id: '',
                role: role,
                name: name,
                email: email,
                password: password
            }      

            console.log("user before send: ", userToSave);
            const userResponce = await postServer('registration', JSON.stringify(userToSave))
            .then(res => {
                console.log('save user success: ', res.data)
                updateLocalStorage('user', res.data.data);
                updateLocalStorage('isLogin', true);
                dispatch(setUser(res.data.data))
                dispatch(isLoginUser(true))
                dispatch(showAlert({text: 'create user success', variant: 'success', show: true, event: onAlertClose}))
                props.history.push('/')
                return res.data.data
            })
            .catch(err => {            
                dispatch(showAlert({text: err, variant: 'error', show: true, event: onAlertClose}))
                console.log('save user failed: ', err)
                return null
            })
            
            console.log("after save user: ", userResponce)

            if(userResponce !== null){
                const couponRes = await postServerCustomUrl('http://localhost:3002/send_coupon', JSON.stringify(userResponce))
                .then(res => res.data.data)
                .catch(err => {console.log("send user coupon error: ", err)})
    
                const msgRes = await postServerCustomUrl('http://localhost:3001/send_message', JSON.stringify(userResponce))
                .then(res => res.data.data)
                .catch(err => {console.log("send user greeting error: ", err)})
            }           
        }      
    }

    const isValidEmail = (email) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(email);
    }

   const updateLocalStorage = (key, value) => {
        let valueJson = JSON.stringify(value)
        localStorage.removeItem(key)
        localStorage.setItem(key, valueJson)
      }
      
    const onAlertClose = () => {        
        dispatch(showAlert({text: '', variant: 'success', show: false, event: ''}));
    }

    
    return (
        <Container className='display-f justifyCo-c'>
            {alert.show ? 
                <SnackbarsCustom data={alert} />
                :''
            }
            <Grid container spacing={3} className='wrapper-registration'>
                <Grid item md={12} sd={12}>
                    <TextField className='input-registration' value={name} onChange={(e)=>{ setName(e.target.value) }} label="Name"/>
                </Grid>                
                <Grid item md={12} sd={12}>
                    <TextField className='input-registration' value={email} onChange={(e)=>{ setEmail(e.target.value) }} label="Email"/>
                </Grid>
                <Grid item md={12} sd={12}>
                    <TextField className='input-registration' type="password" value={password} onChange={(e)=>{ setPassword(e.target.value) }} label="Password" />
                </Grid>               
                <Grid item md={12} sd={12}>
                    <Button onClick={createUser}>Create</Button>
                </Grid>                
            </Grid>
        </Container>
    )
} 