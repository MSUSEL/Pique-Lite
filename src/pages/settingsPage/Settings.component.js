import React from 'react';
import GitBranchingComponent from '../../redux-form/GitBranching.component';
import ShowResult from '../../redux-form/ShowResult';
const Setting= () => {
    return(
        <div>I am a setting page
            <GitBranchingComponent onSubmit={ShowResult}/>
        </div>
    )
}

export default Setting;