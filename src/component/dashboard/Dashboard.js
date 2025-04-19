import React, { useEffect, useState } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react"
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min"
import Moment from "react-moment"


export const Dashboard = () =>{
    const[userName, setUserName] = useState('');
    // const[userData, setUserData] = useState([]);
    const[userInfo, setUserInfo] = useState({profile: []});
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[shouldRedirect, setShouldRedirect] = useState(false);
    const[userId, setUserId] = useState(null);
    const fetchData = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/user'));
            if(!response.ok){
                throw new Error('failed to fetch the data');
            }
            const data = await response.json();
            // setUserData(data);
            setUserInfo(data[data.length-1]);
            setUserId(data[data.length-1].id);
            setUserName(data[data.length-1].name);
            
            // data.find(user => )
        } catch (err) {
            setError(err.message);
        }   
        // Since your data is { user: [...] }, access the first user object
    };
   
    useEffect(()=>{
        const fetchInfo = async() =>{
            setLoading(true);
            setError(null);
            try {
                await fetchData()
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchInfo();
        
    }, []);
    const Delete = async(id) =>{
        
            
            const response = await fetch(`http://localhost:3001/user/${id}`,{
     
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            if(! response.ok){
                throw new Error('failed to delete error')
            }
            const data = await response.json();
            setUserInfo(data);
            setShouldRedirect(true);
            localStorage.setItem('Registration', false);
       
    };
        
    const handleExperience= async(userIndex) =>{

        try {
            
            const response = await fetch(`http://localhost:3001/user/${userId}`);
            if(!response.ok){
                throw new Error('Unable to fetch the data');
            }
            const currentData = await response.json();
            const updatedExp = currentData.work_exp.filter((_,index) =>(index !== userIndex));
            const updatedData = {
                ...currentData,
                work_exp: updatedExp
            };

            const updatedResponse = await fetch(`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedData)
            })
           if(!updatedResponse.ok){
            throw new Error('Not to fetch the data');
           }
           const res = await updatedResponse.json();
           setUserInfo(res);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete experience' + error.message);
        }

    }
    const handleEducation= async(userIndex) =>{
       try {
            
            const response = await fetch(`http://localhost:3001/user/${userId}`);
            if(!response.ok){
                throw new Error('Unable to fetch the data');
            }
            const currentData = await response.json();
            const updatedEdu = currentData.education.filter((_, index) =>(index !== userIndex));
            const updatedData = {
                ...currentData,
                education: updatedEdu
            };

            const updatedResponse = await fetch(`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedData)
            })
           if(!updatedResponse.ok){
            throw new Error('Not to fetch the data');
           }
           const res = await updatedResponse.json();
           setUserInfo(res);
        } catch (error) {
            console.error('Error:', error);
        }
    
    }

    if (loading) return <div className="loading">Loading data...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if(shouldRedirect){
        return <Redirect to ='/login' />;
    }
    return(
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Welcome {userName}
            </p>
   
            {userInfo.profile.length === 0 ? (
                <>
                     <p>You have not yet setup a profile, please add some info</p>
                    <Link to = '/create-profiles' className = "btn bg-primary">
                        Create Profile
                    </Link>
                </>
            ) : (
                <>
                        
                    <Link to='/EditProfiles' className='btn btn-light my-1'>
                            Edit Profiles
                    </Link>
                    <Link to='/addExperience' className='btn btn-light my-1'>
                            Add Experience
                    </Link>
                    <Link to='/addEducation' className='btn btn-light my-1'>
                            Add Education
                    </Link>

                    <div className="my-2">
                    <h1 className="lead">
                        Experience Credentials
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>company</th>
                                <th className="hide-sm">Title</th>
                                <th className="hide-sm">Years</th>
                                <th />
                            </tr>
                        </thead>
                                
                        <tbody>
                            {userInfo.work_exp && userInfo.work_exp.length > 0 ? (
                                userInfo.work_exp.map((user, index) =>(
                                    
                                    <tr key={index}>
                                <td>{user.company}</td>
                                <td>{user.job}</td>
                                <td>
                                    
                                    <Moment format="YYYY/MM/DD">{user.fromData}</Moment> - {
                                        (user.toData === '') ? (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">{user.toData}</Moment>
                                        )
                                    }
                                </td>   
                                    {/* {user.fromData}-{user.toData}</td> */}
                                <td>
                                    <button 
                                        className="btn bg-danger"
                                        onClick={() => handleExperience(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={4}>No experience added yet</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <h1 className="lead">Education Credentials</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>School</th>
                                    <th>Degree</th>
                                    <th>Years</th>
                                    <th>{" "}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo.education && userInfo.education.length > 0 ? (
                                    userInfo.education.map((user, index) =>(
                                        
                                        <tr key={index}>

                                    <td>{user.school}</td>
                                    <td>{user.year}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{user.fromData}</Moment> - 
                                        {user.toData === "" ? (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">{user.toData}</Moment>
                                            
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn bg-danger"
                                            onClick={() => handleEducation(index)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))
                            ): (
                                <tr>
                                    <td colSpan="4">No education added yet</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <button className="btn bg-danger my-2" onClick={() => Delete(userInfo.id)}>
                            <FontAwesomeIcon icon={faUser} className="fa-1.5x"/>  Delete my account</button>
                    </div>
                </>
            )}
            
            
        </Fragment>
    )
}