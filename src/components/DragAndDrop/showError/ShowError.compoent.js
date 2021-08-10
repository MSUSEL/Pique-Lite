import React from "react";
import PropsTypes from "prop-types";
import { MdInfoOutline } from "react-icons/md"; 

const ShowError = ({error, touched}) => {
    return (
        touched && error ? (
            <div>
                <MdInfoOutline style={{position: "relative", top: -2, marginRight: 2}}/>
                {error}
            </div>
        ) : null
    )
}

ShowError.prototype = {
    error: PropsTypes.string,
    touched: PropsTypes.bool
}

export default ShowError;