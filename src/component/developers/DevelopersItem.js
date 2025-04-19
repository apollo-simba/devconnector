import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export const DevelopersItem = ({id, name, status, location, skills, company}) =>{
    return(
        <div className="profile bg-light">
            <FontAwesomeIcon icon={faUser} className="fa-4x"/>
            <div>
            <h2>{name}</h2>
            <p>{status} at {company}</p>
            <p className="my-1">{location}</p>
            
            <Link to={`/developers/${id}`} className = "btn bg-primary">
                View Profile
            </Link>
            </div>

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
    id: PropTypes.string,
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