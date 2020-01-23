import { combineReducers } from 'redux';
import dialog from './dialog';
import user from './user';
import alert from './alert';

export default combineReducers({   
    dialogState: dialog,
    userState: user,
    alertState: alert,
})