import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


export const ProfileTop = ({id}) =>{
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() =>{
      const loadData = async() =>{
        setLoading(true);
        setError(null);
        try {
          await fetchUser();          
        } catch (error) {
          console.error('The Error is occured', error);
        }finally{
           setLoading(false);
        }
      }
      loadData();
    }, [])

    if (loading) return <div className="loading">Loading profiles...</div>;
    if (error) return <div className="error">Error: {error}</div>;  
   
    return(
        <>
        <div className="profile-top bg-primary p-2 my-1">
            <img src="https://www.gravatar.com/avatar/bd237f34e01f00d660799f8d88174185?s=200&r=pg&d=mm" className="round-img" alt="userIcon"/>
            <h1 className="large">{userData.name}</h1>
            <p className="lead">
              {userData.profile[userData.profile.length-1].status}
              { userData.profile[userData.profile.length-1].status && <span> at {userData.profile[userData.profile.length-1].company}</span>}
            </p>
            <p>{userData.profile[userData.profile.length-1].location}</p>
            
            <div className="icons my-1">


            {userData.profile[userData.profile.length-1].social && (
              <a href={userData.profile[userData.profile.length-1].social.website} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGlobe} className="fa-2x"/>
              </a>
            )}
            {userData.profile[userData.profile.length-1].social.twitter && (
              <a href={userData.profile[userData.profile.length-1].social.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="fa-2x"/>
              </a>
            )}
            {userData.profile[userData.profile.length-1].social.facebook && (
              <a href={userData.profile[userData.profile.length-1].social.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="fa-2x"/>
              </a>
            )}
            {userData.profile[userData.profile.length-1].social.linkedin && (
              <a href={userData.profile[userData.profile.length-1].social.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="fa-2x"/>
              </a>
            )}
            {userData.profile[userData.profile.length-1].social.youtube && (
              <a href={userData.profile[userData.profile.length-1].social.youtube} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="fa-2x"/>
              </a>
            )}
            {userData.profile[userData.profile.length-1].social.instagram && (
              <a href={userData.profile[userData.profile.length-1].social.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="fa-2x"/>
              </a>
            )}
            </div>
        </div>
       
        </>
    )

  

}
ProfileTop.propTypes = {
  id: PropTypes.string
};

