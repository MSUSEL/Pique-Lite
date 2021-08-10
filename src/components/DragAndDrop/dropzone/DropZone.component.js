import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types'
import Placeholder from '../placeholder/Placeholder.compoent';
import FilePreview from '../filePreview/FilePreview.compoenent';

const DropZoneField = ({
    handleOnDrop,
    input: {onChange},
    jsonfile,
    meta: {error, touched}
}) => {
    return (
        <div>
            <Dropzone accept='.json' onDrop={file => handleOnDrop(file, onChange)} multiple={true}>
                {props => jsonfile && jsonfile.length > 0 ? <FilePreview jsonfile={jsonfile}/> : <Placeholder {...props} error={error} touched={touched}/>}
            </Dropzone>
        </div>
    )

}
DropZoneField.prototype = {
    error: PropTypes.string,
    handleOnDrop: PropTypes.func.isRequired
}

export default DropZoneField;