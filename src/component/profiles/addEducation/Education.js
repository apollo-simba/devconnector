import React from "react"
import { useState } from "react"
import { Fragment } from "react"
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons/faCodeBranch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export const Education = () =>{
    const[formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        fromData: '',
        toData: '',
        current: false,
        description: ''
    })
    const{school, degree, fieldOfStudy, fromData, toData, current, description} = formData;
    const handleChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const [disabled, toggleDisabled] = useState(false);
    const handleSubmit = async(e) =>{
        const newEducation = {
            
            school,
            degree,
            fieldOfStudy,
            fromData,
            toData,
            current,
            description
        }
        try {
            
            const response = await fetch('http://localhost:3001/education',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newEducation)
            })
            if(response.ok){
                alert('Saved into the server successfully');
                setFormData({
                    school: '',
                    degree: '',
                    fieldOfStudy: '',
                    fromData: '',
                    toData: '',
                    current: false,
                    description: ''
                });
            }
        } catch (error) {
            console.log('The problem is occured');
            console.error('Error:',error);
        }
    }
    return(
        <Fragment>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faCodeBranch}/>  
                Add any school or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        value={school}
                        name="school"
                        onChange={e => handleChange(e)}
                        placeholder="* School or Bootcamp"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={degree}
                        name="degree"
                        onChange={e => handleChange(e)}
                        placeholder="* Degree or Certificate"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={fieldOfStudy}
                        name="fieldOfStudy"
                        onChange={e => handleChange(e)}
                        placeholder="Field of Study"
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
                    />{' '}Current School
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input  
                        disabled= {disabled ? disabled : ''}
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
                        placeholder="Program Description"
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