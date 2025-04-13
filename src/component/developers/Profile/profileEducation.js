import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";




export const ProfileEducation = ({education}) =>{
    return(
        <>
        <ul key={education.id}>
            <li>{education.school}</li>
            <li><Moment format="YYYY/MM/DD">{education.fromData}</Moment>{'-'}
                {! education.toData ? (
                    'Now' ) : (
                        <Moment format="YYYY/MM/DD">{education.toData}</Moment>)
                    }
            </li>
            <li>
                <strong>Position :</strong> {education.degree}
            </li>
            <li><strong>Field Of Study :</strong> {education.fieldOfStudy}</li>
            <li><strong>Description :</strong> {education.description}</li>
            {/* <div className="line"/> */}
        </ul>
        </>
    )
};

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}