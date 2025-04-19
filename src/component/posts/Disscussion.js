import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Moment from "react-moment";


export const Discussion = () =>{
    const {id} = useParams();
    const [postData, setPostData] = useState({});
    const [postName, setPostName] = useState('');
    const [text,setText] = useState('');
    const handleChange = e =>{
        setText(e.target.value);
    }
    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setPostName(res[res.length-1].name);
            }
        } catch (error) {
            console.log('Failed to get the user data', error);
        }
    };

    const fetchPostData = async() =>{
        try {
            const response = await fetch(`http://localhost:3003/post/${id}`);
            if(!response.ok){
                throw new Error ('Unable to fetch the user Data');
            }
            const data = await response.json();
            setPostData(data);
           
        } catch (error) {
            console.error("Not to fetch the user data", error);
        }
    };

    useEffect(() =>{
        const loadData = async() =>{
        try {
                await Promise.all([fetchUser(), fetchPostData()]);
            } catch (error) {
                console.error("There is a error while loading user data", error);
            }
        };
        loadData();
    }, [id]);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3003/post/${id}`);
            if(!response.ok){
                throw new Error('Unable to get the current data');
            }
            const currentData = await response.json();
  
            const updatedData = {
                ...currentData,
                discussion_comment: [...currentData.discussion_comment, text],
                discussion_count: currentData.discussion_count + 1
            };
            const updatedResponse = await fetch(`http://localhost:3003/post/${id}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedData)
            })
            if(!updatedResponse.ok){
                throw new Error('Unable to update the data');
            }
            const res = await updatedResponse.json();
            setPostData(res);
            setText('');
        } catch (error) {
            console.log('Unable to post the data', error);
        }
        
    };
   
    const Cancel = async(discussion_index) =>{
        try {
            const response = await fetch(`http://localhost:3003/post/${id}`);
            if(!response.ok){
                throw new Error('Failed to get the current data');    
            }
            const currentData = await response.json();
            const updatedData = currentData.discussion_comment.filter((_, index) => index !== discussion_index);
           
            const newData = {
                ...currentData,
                discussion_comment: updatedData,
                discussion_count: currentData.discussion_count - 1
            };
            setPostData(newData);
          
            const updatedResponse = await fetch(`http://localhost:3003/post/${id}`,
                {
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(newData)
                }
            )
            if(updatedResponse.ok){
                const res = await updatedResponse.json();
                setPostData(res);
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
                <h4 className = 'text-primary' >{postData.user_name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{postData.post_content}</p>
                <p className="post-date">Post on {' '}
                    <Moment format = "YYYY/MM/DD">{Date.now()}</Moment>
                </p>
            </div>
        </div>
        <div className="post-form" >
            <div className="bg-primary p">
                <h3 className="bg-primary">Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => handleSubmit(e)}>
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
         
        </div>
        {console.log(postName)}
        {postData.discussion_comment && postData.discussion_comment.map((data, index) => (
            <div key={index} className="post bg-white p-1 my-1">
                <div>
                    <Link to = '/viewProfile' className = 'text-primary'>
                    {postName}
                    </Link>
                </div>
                <div>
                    <p className="my-1">{data}</p>
                    <p className="post-date">
                        <Moment format="YYYY/MM/DD">{Date.now()}</Moment>
                    </p>
                    <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faTimes}  onClick={() => Cancel(index)}/>
                    </button>
                </div>
            </div>
        ))}
        </>
    )
}