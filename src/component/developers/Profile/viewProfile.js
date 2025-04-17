import React, {useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ProfileTop } from "./profileTop";
import { ProfileMedium } from "./profileMedium";
import { ProfileExperience } from "./profileExperience";
import { ProfileEducation } from "./profileEducation";




export const ViewProfile = () =>{
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
        const fetchUserData = async() =>{
           try {
               const response = await fetch('http://localhost:3001/user');
               if(!response.ok){
                throw new Error('Unable to the fetch the userData');
               }
               const data = await response.json();
               setUserData(data[data.length-1]);
               
           } catch (err) {
                setError(err.message);
           }finally{
                setLoading(false);
           }
        };    
       
        useEffect(() =>{
            const fetchData = async() =>{
                setLoading(true);
                setError(null);
                try {
                    await fetchUserData();                    
                } catch (error) {
                    console.log('The error is occured while loading the user data', error);
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
       <Link to='/developers' className = "btn btn-light">
            Back To Profiles
       </Link>

       <div className='profile-grid my-1'>
        <ProfileTop />
        <ProfileMedium name={userData.name} />
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">
                    Experience
                </h2>
                {userData.work_exp && (
                   userData.work_exp.map((experience, index) =>(
                    <div key={index}>
                    <ProfileExperience experience = {experience} />
                    </div>))
                )}
            </div>
            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">
                    Education
                </h2>
                {userData.education && (
                    userData.education.map((education, index) =>(
                        <div key={index}>
                        <ProfileEducation education = {education}/>
                        </div>
                    ))
                )}
            </div>

       </div>
       </>
    );
};


