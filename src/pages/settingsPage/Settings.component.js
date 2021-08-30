import React from 'react';
import { Group } from './Setting.styles';
import BranchingForm from '../../components/arrayFrom/BranchingForm.component';

const Setting= () => {
    return (
        <Group>
            <h1>Welcome to Pique</h1>
            <BranchingForm/>
        </Group>
    )
}

export default Setting;