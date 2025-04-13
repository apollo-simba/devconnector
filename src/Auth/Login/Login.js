import React, { useEffect, useState } from "react"
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Login = () =>{
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [data, setData] = useState([]);
    const {email, password} = formData;
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const fetchData = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/user'));
            if(response.ok){
                const res = await response.json();
                setData(res[0].email);
            }
        } catch (error) {
            console.error('The error is occured', error);
            setData('the email does not exist');
        }
    }   
    useEffect(() =>{
        fetchData();   
    }, []);
    
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});  
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(formData.email === data){
            setShouldRedirect(true);
        }
        alert('The email is not existed');
    };

    if(shouldRedirect) {
        localStorage.setItem('Registration', true);
        return <Redirect to="/dashboard" />; // Here is the problem
    }

    return(
        <Fragment>
            <h1 className=" large text-primary">
                Sign In
            </h1>
            
            <p className="lead">
            <FontAwesomeIcon icon={faUser} /> Sign Into Your Account</p>

            <form onSubmit={e => handleSubmit(e)} className="form">
                <div className="form-group">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    className='btn btn-primary'
                /> 
                <p>Did you have an account?  <Link to = '/registry'>Sign up</Link>
                </p>
            </form>
        </Fragment>
        
    )
};



