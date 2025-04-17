import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { DevelopersItem} from "./DevelopersItem";


export const Developers = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/user');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data.length-1);
        setUserData(data[data.length-1]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
   
  useEffect(() =>{
    setLoading(true);
    setError(null);
    const loadData = async() =>{
      
      try {
        await fetchUser();
       
      } catch (error) {
        console.log('this is error', error);
      }finally{
        setLoading(false);
      }
    };

    loadData();
    
  },[]);

  if (loading) return <div className="loading">Loading profiles...</div>;
  if (error) return <div className="error">Error: {error}</div>;    


      return (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect with developers
          </p>
         {console.log(userData.length)}
         {console.log(userData.profile)}
         {console.log(userData.profile[userData.profile.length-1].status)}
            { 
            (<ul>
              <li>
             
                <DevelopersItem 
                name={userData.name}
                status={userData.profile[userData.profile.length-1].status}
                location={userData.profile[userData.profile.length-1].location}
                skills={userData.profile[userData.profile.length-1].skills}
                company={userData.profile[userData.profile.length-1].company}
                />
              </li>
            </ul>) 
            }
                    
        </Fragment>
      );
};