const initialUserState = {
  user: null,
  isLogin: false 
};

export default function shoppingCart(state = initialUserState, action){
    switch(action.type){
        case "SET_USER":
          return {...state, user: action.user};
        case "USER_DISCONNECT":
          return {...state, user: null}; 
        case "USER_ISLOGIN":
          return {...state, isLogin: action.isLogin};        
        default:
          return state;
    }   
}