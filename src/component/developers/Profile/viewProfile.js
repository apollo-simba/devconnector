import React, {useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ProfileTop } from "./profileTop";
import { ProfileMedium } from "./profileMedium";
import { ProfileExperience } from "./profileExperience";
import { ProfileEducation } from "./profileEducation";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



export const ViewProfile = () =>{
    const {id} = useParams();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
        const fetchUserData = async() =>{
           try {
               const response = await fetch(`http://localhost:3001/user/${id}`);
               if(!response.ok){
                throw new Error('Unable to the fetch the userData');
               }
               const data = await response.json();
               setUserData(data);
           } catch (err) {
                setError(err.message);
           }finally{
                setLoading(false);
           }
        };    
       const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setUserId(res[res.length-1].id);
            }
        } catch (err) {
            setError(err.message);
        }
       }
        useEffect(() =>{
            const fetchData = async() =>{
                setLoading(true);
                setError(null);
                try {
                    await Promise.all([fetchUserData(), fetchUser()]);                    
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
       {id === userId && (
            <>
            <Link to='/EditProfiles' className = "btn btn-dark">
                Edit Profiles   
            </Link>
            </>
       )}
       <div className='profile-grid my-1'>
        {console.log(userData)}
        <ProfileTop id ={id}/>
        <ProfileMedium id = {id} name={userData.name} />
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


