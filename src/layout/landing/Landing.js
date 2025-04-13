import { Link } from "react-router-dom/cjs/react-router-dom.min"
import React, { useState } from "react"
import { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



export const Landing =()=>{
  
  const[shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    const isRegistered = JSON.parse(localStorage.getItem('Registration')) || false;
    if (isRegistered) {
        setShouldRedirect(true);
    }
    
    }, []);
    if (shouldRedirect) {
        return <Redirect to="/dashboard" />;
    }
    return(
     
        <section id='landing'>
            <div id='base'>
            
              <h1 style={{ fontSize: '4rem', marginBottom: '0.1rem' }}>
                Developer Connector
              </h1>
              <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Create a developer profile/portfolio, share posts and get help from other developers
              </p>
              <div className='buttons'>
                  <Link to='/registry' className='btn btn-primary'>
                    Sign Up
                  </Link>
                  <Link to='/login' className='btn btn-white'>
                    Login
                  </Link>
              </div>
            </div>
        </section>
 
    )
}