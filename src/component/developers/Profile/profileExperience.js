import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";


export const ProfileExperience = ({experience}) =>{

    return(
        <>
        <ul key={experience.id}>
            <li>{experience.company}</li>
            <li><Moment format="YYYY/MM/DD">{experience.fromData}</Moment>{'-'}
                {! experience.toData ? (
                    'Now' ) : (
                        <Moment format="YYYY/MM/DD">{experience.toData}</Moment>)
                    }
            </li>
            <li>
                <strong>Position :</strong> {experience.job}
            </li>
            <li><strong>Location :</strong> {experience.location}</li>
            <li><strong>Description :</strong> {experience.description}</li>
            {/* <div className="line"/> */}
        </ul>
        </>
    )
}


ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
};
