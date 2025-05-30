import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
    ACCOUNT_DELETED,
    USER_LOADED
} from '../actions/type';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};
export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', true);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
        };
};