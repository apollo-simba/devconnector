import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


export const ProfileMedium = ({name}) =>{
    const [userData, setUserData] = useState({});
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const fetchUserData = async() =>{
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/user');
            if(!response.ok){
                throw new Error('Unable to fetch the UserData');
            }
            const data = await response.json();    
            setUserData(data[data.length-1]); 
            
        } catch (err) {
        setError(err.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() =>{
        setLoading(true);
        setError(null);
        const fetchData = async() =>{
        
            try {
                await fetchUserData();
            } catch (error) {
                console.log('There is a problem while loading the userData', error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();   
            
    }, []);
    
    if (loading) return <div className="loading">Loading profiles...</div>;
    if (error) return <div className="error">Error: {error}</div>;  
    return(
       <>
            <div className='profile-about bg-light p-2'>
                {console.log(name)}
                {console.log(userData.profile)}
                {name && userData.profile && (
                <>
                    <h2 className="lead text-primary">
                        {name.split(' ')[0]}s Bio
                    </h2>
                
                <p>{userData.profile[userData.profile.length-1].proposal}</p>
                <div className="line"/>
                <h2 className="text-primary">Skill Set</h2>

                <div className="skills">
                    {userData.profile[userData.profile.length-1].skills.map((skill, index) =>(
                        <div key={index}>
                            <FontAwesomeIcon icon = {faCheck}/>   {skill} 
                        </div>
                    ))}
                    {/* {userData.profile[userData.profile.length-1].skills} */}

                </div>
                </>
                )
                }
              
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