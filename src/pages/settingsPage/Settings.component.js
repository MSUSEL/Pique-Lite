import React from 'react';
import GitBranchingComponent from '../../redux-form/GitBranching.component';
import ShowResult from '../../redux-form/ShowResult';
import Sidebar from '../../parts/sidebar/Sidebar.component';
const Setting= () => {
    return(
        <div>I am a setting page
            <Sidebar />
            <GitBranchingComponent onSubmit={ShowResult}/>
        </div>
    )
}

export default Setting;