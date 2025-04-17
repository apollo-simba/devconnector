import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Moment from "react-moment"
import { faTimes } from "@fortawesome/free-solid-svg-icons"




export const PostMain = () =>{
    const[userId, setUserId] = useState(null);
    const[userName, setUserName] = useState('');
    const[userData, setUserData] = useState('');
    const[content , setContent] = useState('');
    const handleChange = e =>{
        setContent(e.target.value);
    };

    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const data = await response.json();
                setUserData(data[data.length-1]);
                setUserName(data[data.length-1].name);
                setUserId(data[data.length-1].id);
                // setUpdatedInfo(data[data.length-1]);
            }
            
        } catch (error) {
            console('The error is occured while loading user data', error);
        }
    };

    useEffect(() =>{
        const loadData = async() =>{
            try {
                await fetchUser();
            } catch (error) {
                console.Error('The Error is occured', error);
            }
        };
        loadData();
    },[])
    const handleSubmit = async(e) =>{   
        e.preventDefault();
        const newPost = {
            // user_id: userId,
            // user_name: userName,
            post_content : content,
            post_click: false,
            post_goodRate: 0,
            post_badRate: 0,
            comment: '',
            discussion_number: 0
        }
        try {
            console.log(userId)
            const response = await fetch(`http://localhost:3001/user/${userId}`);
            if(!response.ok){
                throw new Error('Unable to fetch the user data');
            }
            const currentData = await response.json();
            const updatedData = {
                ...currentData,
               post: [...(currentData.post || {}), newPost]
            };
            setUserData(updatedData);
            const updatedResponse = await fetch (`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedData)
            });
           if(response.ok){
            const post = await updatedResponse.json();
            setUserData(post);
            setContent('');
           }
        } catch (err) {
            console.log(err.message);
            alert('Unable to the server' +err.message);
        }
    };

    const Cancel = async(id) =>{
        console.log(`Attempting to delete post with ID: ${id}`); 
        try {  
           const filteredPosts = userData.post.filter((_, index) => (index !== id))
            // postData.filter((_, index) =>(index !== id));
            const newInfo = {
                ...userData,
                post: filteredPosts
            }
            setUserData(prev => ({
                ...prev,
                post: filteredPosts
            }));
            const response = await fetch(`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newInfo)
            });
            if(!response.ok){
                throw new Error('Unable to update the user data');
            }
            const res = await response.json();
            setUserData(res);
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleSet = async(postIndex) =>{
        try {
                const updatedUser  = {...userData};
                const currentGood_Rate = userData.post[postIndex].post_goodRate;
                updatedUser.post[postIndex].post_goodRate = currentGood_Rate + 1;
                setUserData(updatedUser);

                const response =  await fetch(`http://localhost:3001/user/${userId}`,
                    {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(updatedUser)
                    }
                )
                if(!response.ok){
                    throw new Error('Unable to update the data');
                }
                const res = await response.json();
                setUserData(res);
            } catch (error) {
                console.error("the error is occured", error);
                alert('there is a prpblem'+ error.message);
                // setUserData(prev => ({ ...prev }));
            }

    };

    const handleReset = async(postIndex) =>{
        try {

            const updatedInfo = {...userData};

            const currentBad_Rate = updatedInfo.post[postIndex].post_badRate;
            updatedInfo.post[postIndex].post_badRate = currentBad_Rate - 1;

            setUserData(updatedInfo);
            
            const response = await fetch(`http://localhost:3001/user/${userId}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedInfo)
            })
            if(!response.ok){
                throw new Error('Failed to update');
            }
            const res = await response.json();
            setUserData(res);
        } catch (error) {
            console.log('The error is occured', error);
            // setUserData(prev => ({ ...prev }));
        }
    }
    return(
        <div className='post-form'>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form my-1">
                    <textarea
                        cols={30}
                        rows={5}
                        placeholder="Create a post"
                        value={content}
                        onChange={e => handleChange(e)}
                        className="gb-blur-large-empty-element"
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Submit"
                        className="btn bg-dark"
                        />
                </div>

            </form>
            
                {userData.post && (userData.post.map((post, index) =>(
                    <div key={index}>

                        <div className="post bg-white p-1 my-2">
                            <div>
                                <h4 className="text-primary">{userData.name}</h4>
                            </div>
                            <div>
                            
                                <p className="my-1">{post.post_content}</p>
                                <p className="post-date my-1">
                                    Posted on <Moment format="YYYY/MM/DD">{Date.now()}</Moment>
                                </p>
                                <div>
                                    <button className="btn btn-light" type="button" onClick={() => handleSet(index)}>
                                        
                                        <FontAwesomeIcon icon={faThumbsUp} className="fa-1.5x"/>
                                        <span>{post.post_goodRate || ''}</span>
                                    </button>
                                    
                                    <button className="btn btn-light" type="button" onClick={() => handleReset(index)}>
                                        <FontAwesomeIcon icon={faThumbsDown} className="fa-1.5x"/>
                                        <span>{post.post_badRate || ''}</span>
                                    </button>
                                    <Link to = '/discussion' className = "btn btn-primary">Discussion </Link>
                                    <button className="btn btn-danger" onClick={() => Cancel(index)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
                
                
        </div>
    )
}