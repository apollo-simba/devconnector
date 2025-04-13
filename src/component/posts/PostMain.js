import React from "react";
import { useState, useEffect } from "react";
import { PostItems } from "./PostsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown"
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Moment from "react-moment"
import { faTimes } from "@fortawesome/free-solid-svg-icons"



export const PostMain = () =>{
    const[postData, setPostData] = useState([]);
    const[error, setError] = useState(null);
    const[user, setUser] = useState('scamer');
    const[content , setContent] = useState('');
    const[newContent, setNewContent] = useState({});
    const[userData, setUserData] = useState('');
    const[commentData, setCommentData] = useState([]);
    const handleChange = e =>{
        setContent(e.target.value);
    };
    const handleSubmit = async(e) =>{   
        
        e.preventDefault();

        const newContent = {
            content,
            click: false
       
        }
        try {
            const response = await fetch ('http://localhost:3001/post',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newContent)
            });
           if(response.ok){
            const createdPost = await response.json();
            setPostData((prevData) => [...prevData, createdPost]);
            setContent('');
           }
        } catch (err) {
            console.log(err.message);
            alert('Unable to the server');
        }
    };

    const fetchPost = async() =>{
        try {
            
            const response = await fetch('http://localhost:3001/post');
            if(response.ok){
                const res = await response.json();
                setPostData(res);
                
            }
        } catch (err) {
            setError(err.message);
        }

    }

    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setUserData(res[0].name);
            }
            
        } catch (error) {
            console('The error is occured', error);
        }
    };

    const fetchCommentData = async() =>{
        try {
            const response = await fetch('http://localhost:3001/comment')
            if(response.ok){
                const res = await response.json();
                setCommentData(res);
            }
        } catch (error) {
            console.error('Not to fetch the data', error);
        }
    }

    const Cancel = async(id) =>{
        console.log(`Attempting to delete post with ID: ${id}`); 
        try {
            
            const response  = await fetch(`http://localhost:3001/post/${id}` ,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            if(response.ok){
            
                setPostData((prevData) => prevData.filter(data => data.id !== id));
            }
            else{
                console.log('failed to delete', response.status);
                alert('Failed');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() =>{
        const fetchData = async() =>{
            await Promise.all([fetchUser(), fetchPost(), fetchCommentData()]);
        }
        try {
            fetchData();
            
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const handleSet = async(id) =>{
       try {
            const postToUpdate = postData.find(post => post.id === id);
            if(!postToUpdate){
                console.error('Post not found');
                return ;
            }
            const response = await fetch(`http://localhost:3001/post/${id}`,{
                method: 'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({...postToUpdate, click:true})
           })
           if(response.ok){
            
                const updatedPost = await response.json();
                setPostData((prevData) => prevData.map((post) => (post.id === id ? updatedPost : post)));
           }else {
            console.error("Update failed:", response.status);
        }
       } catch (error) {
            console.log('The error is occured', error);
       } 
    };

    const handleReset = async(id) =>{
        try {
            const postToUpdate = postData.find(post => post.id === id);
            if(!postToUpdate){
                console.error('Post not found');
                return ;
            }
            const response = await fetch(`http://localhost:3001/post/${id}`,{
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({...postToUpdate, click:false})
            })
            if(response.ok){
                const updatedPost = await response.json();
                setPostData((prevData) => prevData.map((post) => (post.id === id ? updatedPost: post)));
            }
        } catch (error) {
            console.log('The error is occured', error);
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
             
                {postData.map((post) =>(
                    <div key={post.id}>

                        <div className="post bg-white p-1 my-2">
                            <div>
                                <h4 className="text-primary">{userData}</h4>
                            </div>
                            <div>
                            
                                <p className="my-1">{post.content}</p>
                                <p className="post-date my-1">
                                    Posted on <Moment format="YYYY/MM/DD">{Date.now()}</Moment>
                                </p>
                                <div>
                                    <button className="btn btn-light" type="button" onClick={() => handleSet(post.id)}>
                                        
                                        <FontAwesomeIcon icon={faThumbsUp} className="fa-1.5x"/>
                                        {post.click && <span>1</span>}
                                    </button>
                                    
                                    <button className="btn btn-light" type="button" onClick={() => handleReset(post.id)}>
                                        <FontAwesomeIcon icon={faThumbsDown} className="fa-1.5x"/>
                                    </button>
                                    <Link to = '/discussion' className = "btn btn-primary">Discussion  <span className="comment-count">{commentData.length}</span></Link>
                                    <button className="btn btn-danger" onClick={() => Cancel(post.id)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                
        </div>
    )
}