import React, { Fragment, useState} from "react"
import './Navbar.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Logout } from "../../actions/api";
import { useEffect } from "react";



export const Navbar = () =>{
    // const user = useContext(UserContext);  //This is the part of useContext;
    const [shouldRedirect, setShouldRedirect] = useState(false);
    useEffect(() => {
        const isRegistered = JSON.parse(localStorage.getItem('Registration')) || false;
        if (isRegistered) {
            setShouldRedirect(true);
        }
        
    }, []);

    const primaryLink = (
        <ul id="list">
            <li>
                <Link to='/developers'>Developers</Link>
            </li>
            <li>
                <Link to='/registry'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>

    )
    const guestLink = (
        <ul id="list2">
            <li>
                <Link to='/developers'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                <FontAwesomeIcon icon={faUser}/>  Dashboard</Link>
            </li>
            <li>
                <a onClick={Logout} href='/'>
                <FontAwesomeIcon icon={faSignOutAlt}/>  Logout
                </a>
            </li>
        </ul>
    )


    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                <FontAwesomeIcon icon={faCode} /> DevConnector
                </Link>
                
            </h1>
            <Fragment>{shouldRedirect ? guestLink : primaryLink}</Fragment>
            
        </nav>
    )
}