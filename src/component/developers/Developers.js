import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { DevelopersItem} from "./DevelopersItem";


export const Developers = () => {
    const [userData, setUserData] = useState([]);
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
          {console.log(userData)}
          {userData.length > 0 ?   
            (
                userData.map((user) =>(
                <div key={user.id}>
                  {console.log(user.profile)}
                  <DevelopersItem 
                  id = {user.id}
                  name={user.name}
                  status={user.profile[user.profile.length-1].status}
                  location={user.profile[user.profile.length-1].location}
                  skills={user.profile[user.profile.length-1].skills}
                  company={user.profile[user.profile.length-1].company}
                  />
                </div>
            )
            )) : (
              <h4>No profiles found...</h4>
            )
          }
               
        </Fragment>
      );
};