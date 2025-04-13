import React from "react"
import { useState, useEffect } from "react"
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown"
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Moment from "react-moment"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

export const PostItems = ({post}) =>{
    
    const [userData, setUserData] = useState({});
    // const [postData, setPostData] = useState([]);
    const [error, setError] = useState(null);
    const fetchUser = async() =>{
        try {
            const response = await fetch('http://localhost:3001/user');
            if(response.ok){
                const res = await response.json();
                setUserData(res[0]);
            }
            
        } catch (error) {
            console('The error is occured', error);
        }
    };
    const Cancel = async(id) =>{
        try {
            const response  = await fetch(`http://localhost:3001/post/${id}` ,{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() =>{
        fetchUser();
    }, []);
    
    return(

        <div className="post bg-white p-1 my-2">
            <div>
                <h4 className="text-primary">{userData.name}</h4>
            </div>
            <div>
               
                <p className="my-1">{post.content}</p>
                <p className="post-date my-1">
                    Posted on <Moment format="YYYY/MM/DD">{Date.now()}</Moment>
                </p>
                <div>

                    <button className="btn btn-light" type="button">
                        <FontAwesomeIcon icon={faThumbsUp} className="fa-1.5x"/>
                    </button>
                    <button className="btn btn-light" type="button">
                        <FontAwesomeIcon icon={faThumbsDown} className="fa-1.5x"/>
                    </button>
                    <Link to = '/' className = "btn btn-primary">Discussion</Link>
                    <button className="btn btn-danger" onClick={() => Cancel(post.id)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>
        </div>
    )
}


PostItems.propTypes = {
    post: PropTypes.object.isRequired
};
