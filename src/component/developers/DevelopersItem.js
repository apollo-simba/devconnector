import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export const DevelopersItem = ({name, status, location, skills, company}) =>{
    return(
        <div className="profile bg-light">
            {console.log(name, status, location, skills, company)}
            <FontAwesomeIcon icon={faUser} className="fa-4x"/>
            <div>
            <h2>{name}</h2>
            <p>{status} at {company}</p>
            <p className="my-1">{location}</p>
            
            <Link to='/viewProfile' className = "btn bg-primary">
                View Profile
            </Link>
            </div>
            {console.log(skills)}

            <ul>
            {skills.map((skill, index) =>(

                <li className="text-primary" key={index}>
                    <FontAwesomeIcon icon={faCheck} className="" />  {skill}
                </li>
            ))}

            </ul>
      

        </div>
    )
}
DevelopersItem.propTypes = {
    name: PropTypes.string,
    status: PropTypes.string,
    location:PropTypes.string,
    skills:PropTypes.array,
    company:PropTypes.string
  };
  
  // Default props
  DevelopersItem.defaultProps = {
    name: "",
    status: "",
    location: "",
    skills: "",
    company:""
  };