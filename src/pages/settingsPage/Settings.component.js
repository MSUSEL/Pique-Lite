import React from 'react';
import BranchingForm from '../../components/arrayFrom/ArrayFrom.compoent';
import { Group } from './Setting.styles';
import ShowResultsComponent from '../../components/arrayFrom/ShowResults.component';

const Setting= () => {
    return (
        <Group>
            <h1>Welcome to Pique</h1>
            <BranchingForm/>
        </Group>
    )
}

export default Setting;