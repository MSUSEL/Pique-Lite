import React from 'react'
import { connect } from 'react-redux';
import { setNeighbornodes } from '../../../redux/piqueTree/PiqueTree.actions'
import EditorButton from '../../../components/editorButtion/EditorButton.component'
const NeighborNodes = ({setNeighbornodes}) => {
    return (
        <div>
            <EditorButton onClick={() => {setNeighbornodes()}}>Collase Nodes</EditorButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNeighbornodes: () => dispatch(setNeighbornodes())
})

export default connect(null, mapDispatchToProps)(NeighborNodes)