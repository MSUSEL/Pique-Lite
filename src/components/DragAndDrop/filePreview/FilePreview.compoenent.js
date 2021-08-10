import React from "react";
import PropTypes from "prop-types";

const FilePreview = ({jsonFile}) => {
    return (
        <div>
            <p>{jsonFile.fileName}</p>
        </div>
    )
}

FilePreview.prototype = {
    jsonFile: PropTypes.file
}

export default FilePreview;