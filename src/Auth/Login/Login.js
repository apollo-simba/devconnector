import React, { useEffect, useState } from "react"
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../actions/type";


export const Login = () =>{
    const dispatch = useDispatch();
    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [data, setData] = useState([]);
    const {email, password} = formData;
    const [shouldRedirect, setShouldRedirect] = useState(false);
    // const [filteredEmail, setfilteredEmail] = useState(null);
    const fetchData = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/user'));
            if(response.ok){
                const res = await response.json();
                setData(res);
            }
        } catch (error) {
            console.error('The error is occured', error);
           
        }
    }   
    useEffect(() =>{
        const loadData = async() =>{
           try {
                await fetchData(); 
           } catch (error) {
                console.log(error.message);
           } 
        }
        loadData();
    }, []);
    
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});  
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(data);
        console.log(formData.email);
        const filteredUser = data.find(user =>
          user.email === formData.email
        );
        
        if(filteredUser){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: filteredUser.data,
            })
            setShouldRedirect(true);
            localStorage.setItem('UserId', filteredUser.id);
            localStorage.setItem('login', true);
        }
        else{
            alert('The email is not existed');
        }
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



