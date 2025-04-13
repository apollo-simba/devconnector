import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";




export const Discussion = () =>{
    const [userName, setUserName] = useState('');
    const [text,setText] = useState('');
    const [commentData, setCommentData] = useState([]);
    const [postData, setPostData] = useState([]);
    const handleChange = e =>{
        setText(e.target.value);
    }
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
    const fetchPostData = async() =>{
        try {
            
            const response = await fetch('http://localhost:3001/post');
            if(response.ok){
                const res = await response.json();
                setPostData(res);
            }
        } catch (error) {
            console.log('The error is occured', error);
        } 
    };
    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setUserName(res[0].name);
            }
        } catch (error) {
            console.log('Unable to fetch the user data', error);
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const newComment = {
            text,
            click: false
        };
        try {
            const response = await fetch('http://localhost:3001/comment', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newComment)
            })
            if(response.ok){
                const res = await response.json()
                setCommentData((prevData) => [...prevData, res]);
                setText('');
            }
        } catch (error) {
            console.log('Unable to post the data', error);
        }
        
    };
    useEffect(() =>{
        const fetchData = async() =>{
            try {
                await Promise.all([fetchPostData(), fetchUser(), fetchCommentData()]);
            } catch (error) {
                console.error('Not fetch the data', error);
            }
        }
        fetchData();
    }, [])
    
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
                <h4 className = 'text-primary' >simba</h4>
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
        {commentData.map((data) => (
            <div key={data.id} className="post bg-white p-1 my-1">
                <div>
                    <Link to = '/viewProfile' className = 'text-primary'>
                    {userName}
                    </Link>
                </div>
                <div>
                    <p className="my-1">{data.text}</p>
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