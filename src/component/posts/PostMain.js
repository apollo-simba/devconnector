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
    const[postData, setPostData] = useState([]);
    const[content , setContent] = useState('');
    const[checking, setChecking] = useState({});
    const handleChange = e =>{
        setContent(e.target.value);
    };

    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const data = await response.json();
               
                setUserName(data[data.length-1].name);
                setUserId(data[data.length-1].id);
            }
            
        } catch (error) {
            console('The error is occured while loading user data', error);
        }
    };

    const fetchPost = async() =>{
        try {
            const response = await fetch('http://localhost:3003/post');
            if(response.ok){
                const res = await response.json();
                setPostData(res);
            }
        } catch (error) {
            console.log('Unable to fetch the post data', error);
        }
    };
    useEffect(() =>{
        const loadData = async() =>{
            try {
                await Promise.all([fetchUser(), fetchPost()]);
            } catch (error) {
                console.Error('The Error is occured while fetching the data', error);
            }
        };
        loadData();
    },[])
    const handleSubmit = async(e) =>{   
        e.preventDefault();
        const newPost = {
            user_id: userId,
            user_name: userName,
            post_content : content,
            post_goodRate: false,
            post_badRate: false,
            post_click: false,
            discussion_comment: [],
            discussion_count: 0
        }
        try {   
            const response = await fetch('http://localhost:3003/post',{
                method: 'POST',
                headers: {'Content-Type':'application.json'},
                body: JSON.stringify(newPost)
            });
            if(!response.ok){
                throw new Error('Unable to create the user data in the post json');
            }
            const res = await response.json();
            setPostData(prev => [...prev, res]);
            setContent('');
        } catch (err) {
            console.log(err.message);
            alert('Unable to the server' +err.message);
        }
    };

    const Cancel = async(id) =>{
        console.log(`Attempting to delete post with ID: ${id}`); 
        try {  
      
            setPostData(prev => prev.filter(post => post.id !== id));
            const response = await fetch(`http://localhost:3003/post/${id}`,{
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            });
            if(!response.ok){
                throw new Error('Unable to update the user data');
            }
            // setPostData(res);
        } catch (error) {
            console.log(error.message);
        }
    };
    // 
    const handleSet = async(postId) => {
        console.log(postId);
        
        const check = postData.find(post =>
            post.id === postId
            
        );
        console.log(check.post_badRate);                                                                                                                                                                                                                                                                                                                                                                                  
        if(!check.post_badRate){
          
            try {
                setPostData(prev => prev.map(post => 
                    post.id === postId 
                    ? {...post, post_goodRate: !(post.post_goodRate)}
                    : post
                ));
                
                const response = await fetch(`http://localhost:3003/post/${postId}`, {
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        ...postData.find(p => p.id === postId),
                        post_goodRate: !(postData.find(p => p.id === postId).post_goodRate)
                    })
                });
                
                if(!response.ok) {
                    throw new Error('Failed to update server');
                }
            } catch (error) {
                console.error("Update error:", error);
                // Revert UI if API fails
                setPostData(prev => [...prev]);
            }
        }
        return ;
        
    };

    const handleReset = async(id) =>{
        const check = postData.find(post =>
            post.id === id
        );
        console.log(check.post_goodRate);
        if(!check.post_goodRate){
     
            try {
                
                setPostData(prev => prev.map(post =>
                    post.id === id
                    ? {...post , post_badRate: !(post.post_badRate)}
                    : post
                ))
                const response = await fetch(`http://localhost:3003/post/${id}`,
                    {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(
                            {...postData.find(prev => prev.id === id),
                                post_badRate: !(postData.find(prev => prev.id === id))
                            }
                        )
                    }                                                                                                                                                                               
                )                                                                                                                               
                if(!response.ok){
                    throw new Error('Unable to update the data');
                }
            } catch (error) {
                console.log('The error is occured', error);
                
            }
        }
        return ;
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
            
                {postData && (postData.map((post, index) =>(
                    <div key={index}>

                        <div className="post bg-white p-1 my-2">
                            <div>
                                <h4 className="text-primary">{post.user_name}</h4>
                            </div>
                            <div>
                            
                                <p className="my-1">{post.post_content}</p>
                                <p className="post-date my-1">
                                    Posted on <Moment format="YYYY/MM/DD">{Date.now()}</Moment>
                                </p>
                                <div>
                                    <button className="btn btn-light" type="button" onClick={() => handleSet(post.id)}>   
                                        <FontAwesomeIcon icon={faThumbsUp} className="fa-1.5x"/>
                                        <span>{!(post.post_badRate) && (post.post_goodRate) ? ' 1' : ''}</span>
                                    </button>
                                    
                                    <button className="btn btn-light" type="button" onClick={() => handleReset(post.id)}>
                                        <FontAwesomeIcon icon={faThumbsDown} className="fa-1.5x"/>
                                        <span>{!(post.post_goodRate) && (post.post_badRate) ? ' -1' : ''}</span>
                                    </button>
                                    <Link to = {`/posts/${post.id}`} className = "btn btn-primary">Discussion{' '}
                                    {post.discussion_count ? (
                                        <span className="comment-count">{post.discussion_count}</span>
                                    ) : (
                                        <span>{' '}</span>
                                    )}</Link>
                                    <button className="btn btn-danger" onClick={() => Cancel(post.id)}>
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