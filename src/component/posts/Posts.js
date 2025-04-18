import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment } from "react";
import { PostMain } from "./PostMain";

export const Posts = () =>{

    return(
        <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <FontAwesomeIcon icon={faUser} />  Welcome to the community
        </p>
        <h3 className="bg-primary p">Say Something...</h3>
        <PostMain />
   
        </Fragment>
    )

}