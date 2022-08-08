import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userInfocus:null,
    isLoggedInCUS: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                userInfocus: action.userInfocus
            }
            case actionTypes.USERCUS_LOGIN_SUCCESS:
                return {
                    ...state,
                    isLoggedInCUS: true,
                    userInfocus: action.userInfocus
                }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isLoggedInCUS: false,
                userInfo: null,
                userInfocus:null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
               
            }
            case actionTypes.PROCESS_LOGOUTCUS:
                return {
                    ...state,
                isLoggedInCUS: false,
              
                userInfocus:null
                }
        default:
            return state;
    }
}

export default appReducer;