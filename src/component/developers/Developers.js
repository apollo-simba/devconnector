import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { DevelopersItem} from "./DevelopersItem";


export const Developers = () => {
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
        setUserData(data);
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
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() =>{
    setLoading(true);
    setError(null);
    const fetchData = async() =>{
      
      try {
        await Promise.all([fetchUser(), fetchProfile()]);
       
      } catch (error) {
        console.log('this is error', error);
      }finally{
        setLoading(false);
      }
    }

    fetchData();
  },[]);

  if (loading) return <div className="loading">Loading profiles...</div>;
  if (error) return <div className="error">Error: {error}</div>;    


      return (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect with developers
          </p>
         {console.log(profileData.length)}
            {((profileData.length > 0) && (userData.length > 0)) ? 
            (<ul>
              <li>
             
                <DevelopersItem 
                name={userData[0].name}
                status={profileData[0].status}
                location={profileData[0].location}
                skills={profileData[0].skills}
                company={profileData[0].company}
                />
              </li>
            </ul>) : (
              <h4>No profiles found...</h4>
            )
            }
                    
        </Fragment>
      );
};