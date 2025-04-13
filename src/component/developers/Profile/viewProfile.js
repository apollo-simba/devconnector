import React, {useState, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ProfileTop } from "./profileTop";
import { ProfileMedium } from "./profileMedium";
import { ProfileExperience } from "./profileExperience";
import { ProfileEducation } from "./profileEducation";




export const ViewProfile = () =>{
    const [user, setUser] = useState({});
    const [userExperience, setUserExperience] = useState([]);
    const [userEducation, setUserEducation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
        const fetchUser = async() =>{
           try {
               const response = await fetch('http://localhost:3001/user');
               const res = await response.json();
               setUser(res[0]);
               
           } catch (err) {
                setError(err.message);
           }finally{
                setLoading(false);
           }
        };    
        const fetchExperience = async() =>{
            try {
                const response = await fetch('http://localhost:3001/work_exp');
                const res = await response.json();
                setUserExperience(res);
            } catch (err) {
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        const fetchEducation = async() =>{
            try{
                const response = await fetch('http://localhost:3001/education');
                const res = await response.json();
                setUserEducation(res);
            }catch(err){
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
                    Promise.all([fetchUser(), fetchExperience(), fetchEducation()]);
                    
                } catch (error) {
                    console.log('the error is occured', error);
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
        <ProfileMedium name={user.name} />
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">
                    Experience
                </h2>
                {userExperience && (
                   userExperience.map((experience, index) =>(
                    <div key={index}>
                    <ProfileExperience experience = {experience} />
                    </div>))
                )}
            </div>
            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">
                    Education
                </h2>
                {userEducation && (
                    userEducation.map((education, index) =>(
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


