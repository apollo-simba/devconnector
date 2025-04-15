import React, { use, useEffect, useId } from "react"
import { useState } from "react"
import { Fragment } from "react"
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons/faCodeBranch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export const Experience = () =>{
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const[formData, setFormData] = useState({
        job: '',
        company: '',
        location: '',
        fromData: '',
        toData: '',
        current: false,
        description: ''
    })
    const{job, company, location, fromData, toData, current, description} = formData;

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response  = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setUserId(res[0].id);
                
            }
            console.log(userId);
        } catch (error) {
            console.Error('Unable to fetch the userId', error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        const loadUser = async() =>{
            await fetchUser();
        }
        loadUser();
    }, [])
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const [disabled, toggleDisabled] = useState(false);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(! useId){
            alert('please wait for loading userId');
           
        }
        const newExperience = {
            
            job,
            company,
            location,
            fromData,
            toData, 
            current,
            description
        }

        try {

            const response = await fetch(`http://localhost:3001/user/${userId}`);
            if(!response.ok){
                throw new Error('Unable to get the user data');
            }

            const currentData = await response.json();// 1. get the current state
            const newUserData = {
                ...currentData,
                work_exp: [newExperience]
            }// modify the data you want to update

            const updatedResponse = await fetch(`http://localhost:3001/user/${userId}`, {
    
                method:'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newUserData)
            
            }
            )
            if(updatedResponse.ok){
                alert('Added the Experience successfully');
                setFormData({
                    job: '',
                    company: '',
                    location: '',
                    fromData: '',
                    toData: '',
                    current: false,
                    description: ''
                });
            }
        } catch (error) {
            console.log('The problem is occrued!');
            console.error('Error:', error);
        }
    }
    return(
        <Fragment>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faCodeBranch}/>  
                Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        value={job}
                        name="job"
                        onChange={e => handleChange(e)}
                        placeholder="* Job Title"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={company}
                        name="company"
                        onChange={e => handleChange(e)}
                        placeholder="* Company"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={location}
                        name="location"
                        onChange={e => handleChange(e)}
                        placeholder="Location"
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="fromData"
                        value={fromData}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        name="current"
                        checked = {current}
                        value={current}
                        onChange={() =>{
                            setFormData({...formData , current: !current});
                            toggleDisabled(!disabled);
                        }}
                    />{' '}Current Job
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input  
                        disabled= {disabled ? 'disabled' : ''}
                        type="date"
                        name="toData"
                        value={toData}
                        onChange={e => handleChange(e)}
                    />
                    
                </div>
                <div className="form-group">
                    <textarea
                        cols={30}
                        rows={5}
                        placeholder="Job Description"
                        name="description"
                        value={description}
                        onChange={e => handleChange(e)}
                    />
                        
                </div>
                
                <input  
                    type="Submit"
                    name="Submit"
                    className="btn bg-primary my-1"
                />
                <Link className = "btn btn-light my-1">
                Go Back</Link>
                
            </form>
        </Fragment>
    )
}