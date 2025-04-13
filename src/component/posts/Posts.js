import React, { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react";
import { PostItems } from "./PostsItem";
import { PostMain } from "./PostMain";
import { faDribbble } from "@fortawesome/free-brands-svg-icons";





export const Posts = () =>{
    
    return(
        <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <FontAwesomeIcon icon={faUser} />  Welcome to the community
        </p>
        <h3 className="bg-primary p">Say Something...</h3>
        <PostMain />
        {/* {postData.map((post) =>(
            
            <div key={post.id}>
                <PostItems post = {post.content}/>
                {console.log(post.content)}
            </div>
        ))} */}
        
        </Fragment>
    )

}