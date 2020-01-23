import React from 'react'
import { Container } from '@material-ui/core'
import {useSelector, useDispatch } from 'react-redux'
import SnackbarsCustom from './SnackbarsCustom'
import {showAlert} from '../actions/index'

const Home = () =>{
    let user = useSelector(state => state.userState.user)
    let isLogin = useSelector(state => state.userState.isLogin)
    let alert = useSelector(state => state.alertState.alert)
    let dispatch = useDispatch()

    const title = user !== null &&  isLogin? user.name: 'Guest'

    const onAlertClose = () => {        
        dispatch(showAlert({text: '', variant: 'success', show: false, event: ''}));
    }

    return(
        <Container className='display-f justifyCo-c' style={{'marginTop': '5%'}}>
            {alert.show ? 
                <SnackbarsCustom data={alert} />
                :''
            }
           <h1> Welcome: {' ' + title}</h1>
        </Container>
    )
}

export default Home