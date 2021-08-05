import React from 'react';
import { Title,Content } from './Assess.styles';
import DropZone from '../../../components/dropzone/DropZone.component';
const Assess = () => {
    return (
        <div>
            <Title>Drag and Drop</Title>
            <Content>
                <DropZone/>
            </Content>
        </div>
    )
}

export default Assess;