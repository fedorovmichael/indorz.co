
//dialog
export function showDialog(dialogData){
    return {type: 'SHOW_DIALOG', dialog: dialogData};
}

//alert
export function showAlert(alertData){
    return {type: 'SHOW_ALERT', alert: alertData};
}

//user
export function setUser(userData){
    return {type: 'SET_USER', user: userData};
}

export function disconectUser(){
    return {type: 'USER_DISCONNECT', user: null};
}

export function isLoginUser(login){
    return {type: 'USER_ISLOGIN', isLogin: login};
}

export function setUserForgetPassword(forgetPasswordData){
    return {type: 'USER_FORGET_PASSWORD', forgetPassword: forgetPasswordData};
}