import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";




export const Discussion = () =>{
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(null);
    const [text,setText] = useState('');
    const [commentData, setCommentData] = useState([]);
    const handleChange = e =>{
        setText(e.target.value);
    }
    const fetchUserData = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(!response.ok){
                throw new Error ('Unable to fetch the user Data');
            }
            const data = await response.json();
            setUserData(data[data.length-1]);
            setUserId(data[data.length-1].id);
        } catch (error) {
            console.error("Not to fetch the user data", error);
        }
    };

    useEffect(() =>{
        const loadData = async() =>{
        try {
                await fetchUserData();
            } catch (error) {
                console.error("There is a error while loading user data", error);
            }
        };
        loadData();
    }, [])
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const newComment = {
                text
            };
    
            const response = await fetch(`http://localhost:3001/user/${userId}`);
            if(!response.ok){
                throw new Error('Unable to get the current data');
            }
            const currentData = await response.json();
  
            const updatedData = {
                ...currentData,
                comment: newComment
            }
            const updatedResponse = await fetch(`http://localhost:3001/user/${userId}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedData)
            })
            if(!updatedResponse.ok){
                throw new Error('Unable to update the data');
            }
            const res = await updatedResponse.json();
            setUserData(res);
            setCommentData((prevData) => [...prevData, res.comment]);
            setText('');
        } catch (error) {
            console.log('Unable to post the data', error);
        }
        
    };
   
    const Cancel = async(id) =>{
        try {

            const response = await fetch(`http://localhost:3001/comment/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            if(response.ok){
                setCommentData((prevData) => prevData.filter(data => data.id !== id));
            }
        } catch (error) {
            console.log('Unable to cancel the data', error);
        }
    };
    return(
        <>
        <Link to = '/posts' className = 'btn btn-light'>
        Back to Posts
        </Link>
        <div className="post bg-white p-1 my-1">
            <div>

                <Link to ='/viewProfile'>
                <h4 className = 'text-primary' >{userData.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">djkslfj</p>
                <p className="post-date">Post on {Date.now()}</p>
            </div>
        </div>
        <div className="post-form" onSubmit={e => handleSubmit(e)}>
            <div className="bg-primary p">
                <h3 className="bg-primary">Leave a Comment</h3>
            </div>
            <form className="form my-1">
                <textarea
                    name="Create a comment"
                    value={text}
                    onChange={e => handleChange(e)}
                    cols={30}
                    rows={5}
                    placeholder="Create a comment"
                    />
            <button className="btn bg-dark my-1">
                Submit
            </button>
            </form>
            {console.log(commentData)}
        </div>
        {commentData && commentData.map((data, index) => (
            <div key={index} className="post bg-white p-1 my-1">
                <div>
                    <Link to = '/viewProfile' className = 'text-primary'>
                    {userData.name}
                    </Link>
                </div>
                <div>
                    <p className="my-1">{data}</p>
                    <p className="post-date">{Date.now()}</p>
                    <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTimes}  onClick={() => Cancel(data.id)}/>
                    </button>
                </div>
            </div>
        ))}
        </>
    )
}