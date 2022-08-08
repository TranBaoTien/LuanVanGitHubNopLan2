import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    isLoggedInCUS:false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoggedInCUS:true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isLoggedInCUS:false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isLoggedInCUS:false,
                adminInfo: null
            }
          
        default:
            return state;
    }
}

export default appReducer;