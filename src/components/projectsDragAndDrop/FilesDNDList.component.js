import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';


const FilesDNDList = ({projects}) => {
    console.log("I am fileDND", projects)
    // perpare projects to show on the dnd list
    const getData = () => {
        const result = projects.map(file => {
           return ({
               id: `${file.versionNumber}`,
               content: `v${file.versionNumber} ${file.fileName}`
           })         
        })
        return result
    }

    const result = getData();
    console.log(result)
  
    const deletedId = item => {
        items.filter(file => file !== item)
        updateItems(items)
    }
    const [items, updateItems] = React.useState(result);
    console.log("show me the item" ,items)
    return (
        <div>
            {
                items ? items.map((item,index) => {
                    return(
                        <div key={index}>
                            <button onClick={() => deletedId(item)}>remove</button>
                        </div>
                    )
                }) : null
            }
            
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})
export default connect(mapStateToProps)(FilesDNDList)