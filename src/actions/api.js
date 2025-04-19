import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";




export const Logout = () =>{
   
    localStorage.setItem('Registration', false);
    localStorage.setItem('UserName', null);
    return <Redirect to="/login" />;
}

    