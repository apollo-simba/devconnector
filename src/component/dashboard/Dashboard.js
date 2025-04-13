import React, { useEffect, useState } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react"
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min"
import Moment from "react-moment"


export const Dashboard = () =>{
    const[userName, setUserName] = useState('');
    const[userInfo, setUserInfo] = useState([]);
    const[userExperience, setUserExperience]  = useState([]);
    const[userEducation, setUserEducation] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[shouldRedirect, setShouldRedirect] = useState(false);

    const fetchData = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/user'));
            if(!response.ok){
                throw new Error('failed to fetch the data');
            }
            const data = await response.json();
            setUserInfo(data[0]);
            setUserName(data[data.length-1].name);
        } catch (err) {
            setError(err);
        }
        
    };
    const fetchExperience = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/work_exp'));
            if(!response.ok){
                throw new Error('failed to fetch the data');
            }
            const data = await response.json();
            setUserExperience(data);
        } catch (err) {
            setError(err);
        }
    };
    const fetchEducation = async() =>{
        try {
            const response = await fetch(('http://localhost:3001/education'));
            if(!response.ok){
                throw new Error('failed to fetch the data');
            }
            const data = await response.json();
            setUserEducation(data);
        } catch (err) {
            setError(err);
        }
 
    };

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
        
     
    useEffect(()=>{
        const fetchInfo = async() =>{
            setLoading(true);
            setError(null);
            try {
                await Promise.all([fetchData(), fetchExperience(), fetchEducation()]);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchInfo();
        
        
    }, []);
    
    const handleExperience= async(id) =>{

        try {
        
            const response = await fetch(`http://localhost:3001/work_exp/${id}`,{
                method: 'DELETE',
                headers:{'Content-Type':'application/json'}
            });
            if(response.ok){
                alert('Removed the data successfully');
                setUserExperience(userExperience.filter(exp => exp.id !== id));
                console.log(userExperience);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
    const handleEducation= async(id) =>{

        try {
        
            const response = await fetch(`http://localhost:3001/education/${id}`,{
                method: 'DELETE',
                headers:{'Content-Type':'applicaiton/json'}
            });
            if(response.ok){
                alert('Removed the data successfully');
                setUserEducation(userEducation.filter(exp => exp.id !== id));
                console.log(userEducation);
            }
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
           
            <div>

            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Welcome {userName}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            
            <Link to='/create-profiles' className='btn btn-primary my-1'>
                    Create Profiles
            </Link>
            <Link to='/addExperience' className='btn btn-primary my-1'>
                    Add Experience
            </Link>
            <Link to='/addEducation' className='btn btn-primary my-1'>
                    Add Education
            </Link>

        
        </div>
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
                    {userExperience.map((user) =>(

                    <tr key={user.id}>
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
                                onClick={() => handleExperience(user.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
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
                        {userEducation.map((user) =>(

                        <tr key={user.id}>

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
                                    onClick={() => handleEducation(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn bg-danger my-2" onClick={() => Delete(userInfo.id)}>
                    <FontAwesomeIcon icon={faUser} className="fa-1.5x"/>  Delete my account</button>
           </div>
        </Fragment>
    )
}