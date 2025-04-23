import React, {Fragment, useEffect } from "react"
import { useState } from "react"
import './Registry.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCake, faUser } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";




export const Registry = () =>{
    // dispatch = useDispatch();
    // const dispatch = useDispatch();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    });
    const {name, email, password1, password2} = formData;
    useEffect(() => {
        const isRegistered = JSON.parse(localStorage.getItem('Registration')) || false;
        if (isRegistered) {
            setShouldRedirect(true);
        }
        
    }, []);
    if (shouldRedirect) {
        return <Redirect to="/dashboard" />;
    }
    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (keep your existing validation logic)
        const newUser = {
            name,
            email,
            password: password1,  
            profile: [],
            work_exp: [],
            education: [],
            createdDate:Date.now(),
            updatedDate: null,
            
          };// Remember: Hash this in production!
        
      
        const res = await fetch('http://localhost:3001/user');
        if(!res.ok){
            alert('Unable to the server')
        }
        const data = await res.json();
        console.log(data);
        if(data.some((user) =>(user.email === email))){
            alert('User already exsits');
            setFormData({
                name: '',
                email: '',
                password1: '',
                password2: '',
            });
            return ;
        }
        try {
          // Save to db.json via json-server
          const response = await fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          });
      
          if (response.ok) {
            // const rep = await response.json();
           
            // dispatch({
            //     type: REGISTER_SUCCESS,
            //     payload: rep.data
            // });
            localStorage.setItem('Registration', true);
            alert("User saved to db.json!");
            setFormData({
                name: '',
                email: '',
                password1: '',
                password2: ''
            });
            setShouldRedirect(true);  // This will trigger the redirect
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };
    return(
        <Fragment>

            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser}/>{'  '}Create Your Account
            </p>
            <form onSubmit={e => handleSubmit(e)} className='form'>
                <div className='form-group'>
                    <input
                        name="name"
                        placeholder="Name"
                        type="text" 
                        value={name}
                        onChange={e => handleChange(e)}
                        />
                </div>
                <div className='form-group'>
                    <input
                        name="email"
                        placeholder="Email Address"
                        type="text"
                        value={email}
                        onChange={e => handleChange(e)}
                        />
                    <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                
                <div className='form-group'>
                    <input 
                        name="password1"
                        placeholder="Password"
                        type="password"
                        value={password1}
                        onChange={e => handleChange(e)}
                        />
                </div>
                <div className='form-group'>
                    <input 
                        name="password2"
                        placeholder="Confirm Password"
                        type="password"
                        value={password2}
                        onChange={e => handleChange(e)}
                        />
                </div>
                
                <input
                    type="submit"
                    value='Register'
                    className='btn btn-primary'
                    />
                <p className="my-1">
                    Already have an account?  <Link to = '/login'>Sign in</Link> 
                </p>
            </form>
   
        </Fragment>
        
    )
}