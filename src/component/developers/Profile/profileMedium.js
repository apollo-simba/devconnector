import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";


export const ProfileMedium = ({name}) =>{
    const[userProfile , setUserProfile] = useState({});
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const fetchProfile = async() =>{
        
        try {
            const response = await fetch('http://localhost:3001/profile');
            const res = await response.json();    
            setUserProfile(res[0]); 
            
        } catch (err) {
        setError(err.message);
        }
    }
    useEffect(() =>{
        setLoading(true);
        setError(null);
        try {
            
            fetchProfile();
        } catch (error) {
            console.log('This is error', error);
        }finally{
            setLoading(false);
        }
    }, []);
    
    if (loading) return <div className="loading">Loading profiles...</div>;
    if (error) return <div className="error">Error: {error}</div>;  
    return(
       <>
            <div className='profile-about bg-light p-2'>
                {console.log(name)}
                {userProfile.proposal && (
                    
                    <h2 className="lead text-primary">
                        {name.split(' ')[0]}s Bio
                    </h2>
                )
                }
                <p>{userProfile.proposal}</p>
                <div className="line"/>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">{userProfile.skills}</div>
                {console.log(userProfile.skills)}
                {/* {userProfile.skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                        <FontAwesomeIcon icon = {faCheck}/> {skill} 
                    </div>
                ))} */}
                {/* <div className="skills">
                
                {userProfile.skills.split(',').map((skill, index) =>(
                    <div key={index} className="p-1">
                    <FontAwesomeIcon icon={faCheck}/> {skill}
                    </div> 
                    ))}
                    </div> */}
            </div>
            
        </>
    )
}

ProfileMedium.propTypes = {
    name: PropTypes.string
};
ProfileMedium.defaultTypes = {
    name:''
};