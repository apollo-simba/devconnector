import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";




export const Logout = () =>{
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
}

    