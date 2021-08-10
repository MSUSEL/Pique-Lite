import React from 'react';
import PropTypes from 'prop-types';
import {MdCloudUpload} from 'react-icons/md'

const Placeholder = ({getInputProps, getRootProps, error, touched}) => {

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()}/>
            <MdCloudUpload/>
            <p>Pick a pique output to this area to upload</p>
        </div>
    )
}

Placeholder.prototype = {
    error: PropTypes.string,
    getInputProps: PropTypes.func.isRequired,
    getRootProps: PropTypes.func.isRequired,
    touched: PropTypes.bool
}

export default Placeholder;