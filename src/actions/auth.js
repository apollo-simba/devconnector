import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LOGOUT,
         CLEAR_PROFILE
 } from "./type";

//  export const loadUser = () => async dispatch => {
  

//     try {
//         const res = await axios.get('/api/auth');

//         dispatch({
//             type: USER_LOADED,
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: AUTH_ERROR,
//         });
//     }
// };

 export const Logout = () =>{
    // dispacth({ type: CLEAR_PROFILE });
    // dispacth({ type: LOGOUT});
   const registryState = localStorage.getItem('Registration');
   const loginState = localStorage.getItem('login');
   if(registryState){
       localStorage.setItem('Registration', false);
   }
   if(loginState){
       localStorage.setItem('login', false);
   }
   localStorage.setItem('UserId', null);
    return <Redirect to="/login" />;
};


    