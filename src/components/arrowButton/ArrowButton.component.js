import React from 'react';
import { Container, Arrow} from './ArrowButton.styles'
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io"
import EditorButtion from '../editorButtion/EditorButton.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import { getRiskColor, getRiskIcon } from '../../utils/piqueTree.utils';
import { setRiskList } from '../../redux/piqueTree/PiqueTree.actions';

const ArrowButton = ({children, projects, setRiskList}) => {
    const [show, setShow] = React.useState(false);
    
    console.log(getRiskColor(0.5))
    const handleCard = (file) => {
        let results = []
        file.fileContent.children.map(item => 
            results.push({
                qaName: item.name,
                qaValue: item.value,
                qaColor: getRiskColor(item.value),
                qaIcon: getRiskIcon(item.value)
            })
       )
       setRiskList(results)
    }
    return (
        <div>
            <EditorButtion  onClick={() => setShow(!show)}>
                <Container>
                    {children}
                    {show
                    ? <Arrow><IoMdArrowDropup/></Arrow>
                    : <Arrow><IoMdArrowDropdown/></Arrow>
                    }
                </Container>
            </EditorButtion>
            {show && projects.map((file, i) => 
                <EditorButtion key={i} 
                    onClick={
                    () => handleCard(file)}
                >
                    {`v${file.versionNumber}`}
                </EditorButtion>)
            }
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setRiskList: file => dispatch(setRiskList(file))
})
export default connect(mapStateToProps, mapDispatchToProps)(ArrowButton)