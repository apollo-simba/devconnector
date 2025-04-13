import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from "react";



export const ProfileTop = () =>{
    const [userData, setUserData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/user');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProfileData(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() =>{
      const fecthData = async() =>{
        setLoading(true);
        setError(null);
        try {
          Promise.all([fetchUser(), fetchProfile()]);
          
        } catch (error) {
          console.error('The Error is occured', error);
        }finally{
           setLoading(false);
        }
      }
      fecthData();
    }, [])

    if (loading) return <div className="loading">Loading profiles...</div>;
    if (error) return <div className="error">Error: {error}</div>;  

    return(
        <>
        <div className="profile-top bg-primary p-2 my-1">
            <img src="https://www.gravatar.com/avatar/bd237f34e01f00d660799f8d88174185?s=200&r=pg&d=mm" className="round-img" alt="userIcon"/>
            <h1 className="large">{userData.name}</h1>
            <p className="lead">
              {profileData.status}
              { profileData.company && <span> at {profileData.company}</span>}
            </p>
            <p>{profileData.location}</p>
            
            <div className="icons my-1">


            {profileData.website && (
              <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGlobe} className="fa-2x"/>
              </a>
            )}
            {profileData.twitter && (
              <a href={profileData.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} className="fa-2x"/>
              </a>
            )}
            {profileData.facebook && (
              <a href={profileData.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="fa-2x"/>
              </a>
            )}
            {profileData.linkedin && (
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="fa-2x"/>
              </a>
            )}
            {profileData.youtube && (
              <a href={profileData.youtube} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className="fa-2x"/>
              </a>
            )}
            {profileData.instagram && (
              <a href={profileData.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="fa-2x"/>
              </a>
            )}
            </div>
        </div>
       
        </>
    )
}