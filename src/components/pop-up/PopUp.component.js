import React from 'react';
import {Content, Close} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import SingleFileUploadComponent from './SingleFileUpload.component';
import MultipleFileUpload from './MultipleFileUpload.component';
import FileDnDComponent from '../projectsDragAndDrop/FileDnD.component';
import EditorButton from '../editorButtion/EditorButton.component'
import LinearProgress from '@material-ui/core/LinearProgress';

const Popup = ({toggle, projects}) => {
    const [show, setShow] = React.useState(false);
    return(
        <Content>
            <Close> 
                <FaRegWindowClose onClick={toggle}/>
            </Close>
            <div>
                <SingleFileUploadComponent/>
            </div>
            <div>
                <MultipleFileUpload/>
            </div>
            <EditorButton onClick={() => setShow(!show)}>Sort Uploaded Files</EditorButton>
            {show ? <FileDnDComponent/> : null}
           
        </Content>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
})

export default connect(mapStateToProps)(Popup);