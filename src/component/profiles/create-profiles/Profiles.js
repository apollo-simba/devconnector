import React from "react"
import { useState, useEffect } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react"
import "./Profiles.css"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook"
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"






export const Profiles = () =>{
    const [loading, setLoading] = useState(true);
    const[formData, setFormData] = useState(
        {
            status : '',
            company : '',
            website : '',
            location : '',
            skills : '',
            gitName : '',
            proposal : '',
            twitter : '',
            facebook : '',
            youtube: '',
            linkedin: '',
            instagram: ''
        }
    );
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const {status, company, website, location, skills, gitName, proposal, twitter, facebook, youtube, linkedin, instagram} = formData;

    const fetchUser = async() =>{
       try {
            setLoading(true);
           const response = await fetch('http://localhost:3001/user');
           if(response.ok){
                const res = await response.json();
                setUserId(res[0].id);
                setUserName(res[0].name);
           }
           console.log(userId);
       } catch (error) {
            console.error('Unable to fetch the userInfo', error);
       }finally{
        setLoading(false);
       }
    };

    useEffect(() =>{
        const loadData = async() =>{
            await fetchUser();
        };
        loadData();
    }, []);

    const handleChange = e =>{

        setFormData({...formData, [e.target.name]: e.target.value});
    }
        
    console.log(formData);
    
    const [socialNetworkLinks, displayLinks] = useState(false);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(! userId){
            alert('please wait while we load your user data');
            return ;
        }
        const newProfile = {
            
            status,
            company,
            website,
            location,
            skills: skills.split(',').map((skill) =>(skill.trim())),
            gitName,
            proposal,
            social:{
                
                twitter,
                facebook,
                youtube,
                linkedin,
                instagram
            }
        };
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:3001/user/${userId}`); //1. get the current user data.
            
            if(!response.ok){
                throw new Error('Unable to access the user data');
            }

            const currentData = await response.json();
            
            const updatedData = {
                ...currentData, profile: [newProfile]
            }// update the data

            const updatedResponse = await fetch(`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedData)
            })
                if(updatedResponse.ok){
                alert('Saved into the server successfully');
                setFormData(
                    {
                        status : '',
                        company : '',
                        website : '',
                        location : '',
                        skills : '',
                        gitName : '',
                        proposal : '',
                        twitter : '',
                        facebook : '',
                        youtube: '',
                        linkedin: '',
                        instagram: ''
                    }
                );
            }
            
        } catch (error) {
            console.error("Error:", error);
            alert('Error saving profile:' + error.message);
        }

    }
   
    return(
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser}/>  Let's get some information to make your profile stand out
            </p>
            <small>* = required field
            </small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
            <div className="form-group">
                <select
                    name="status"
                    onChange = {e => handleChange(e)}
                    value={status}
                >
                    <option value="Select Professional Status">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="instructor or teacher">instructor or teacher</option>
                    <option value="intern">intern</option>
                    <option value="other">other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
                <input
                    name="company"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={e => handleChange(e)}
                    
                />
            <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
                <input
                    name="website"
                    type="text"
                    placeholder="Website"
                    value={website}
                    onChange={e => handleChange(e)}
                />
                <small className="form-text">Could be your own or a company website</small>
            </div>
            <div className="form-group">
                <input
                    name="location"
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => handleChange(e)}
                />
                <small className="form-text">City & state suggested (eg. Boston, MA)</small>
            </div>
            <div className="form-group">
                <input
                    name="skills"
                    type="text"
                    placeholder="* Skills"
                    value={skills}
                    onChange={e => handleChange(e)}
                />
                <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div className="form-group">
                <input
                    name="gitName"
                    type="text"
                    placeholder="Github Username"
                    value={gitName}
                    onChange={e => handleChange(e)}
                />
                <small className="form-text">If you want your latest repos and a Github link, include your username</small>
            </div>
            <div className="form-group">
                <textarea
                    name="proposal"
                    placeholder="A short bio of yourself"
                    value={proposal}
                    onChange={e => handleChange(e)}
                />
                <small className="form-text">Tell us a little about yourself</small>
            </div>
            <div className="my-2">
                <button type="button" className="btn btn-light" onClick={() => displayLinks(!socialNetworkLinks)}>Add Social Network Links</button>
                <span>Optional</span>
            </div>
            
            {socialNetworkLinks && (
                <Fragment>
                    <div className="form-group2 social-input">
                        <FontAwesomeIcon icon={faTwitter} className="fa-2x"/>
                        <input  
                            name="twitter"
                            type="text"
                            placeholder="Twitter URL"
                            value={twitter}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group2">
                        <FontAwesomeIcon icon={faFacebook} className="fa-2x"/>
                        <input  
                            name="facebook"
                            type="text"
                            placeholder="Facebook URL"
                            value={facebook}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group2">
                        <FontAwesomeIcon icon={faYoutube} className="fa-2x"/>
                        <input  
                            name="youtube"
                            type="text"
                            placeholder="Youtube URL"
                            value={youtube}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group2">
                        <FontAwesomeIcon icon={faLinkedin} className="fa-2x"/>
                        <input  
                            name="linkedin"
                            type="text"
                            placeholder="Linkedin URL"
                            value={linkedin}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    <div className="form-group2">
                        <FontAwesomeIcon icon={faInstagram} className="fa-2x"/>
                        <input  
                            name="instagram"
                            type="text"
                            placeholder="Instagram URL"
                            value={instagram}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                    
                </Fragment>
                )

                }
                 <div className="my-3">
                    <input
                        value="Submit"
                        type="submit"
                        className="btn bg-primary"
                    />
                    <button type="button" className="btn">Go Back</button>
                </div>
            </form>
        </Fragment>
    )
}