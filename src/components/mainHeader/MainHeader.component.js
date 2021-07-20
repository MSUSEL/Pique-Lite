import React from 'react';
import PiqueChart from '../../charts/PiqueChart.component';
import { MainHeaderContainer } from './MainHeader.styles';

const MainHeader = ({blockHeight, width, height, options, chartType, rootProps, data}) => {
    return (
        <MainHeaderContainer blockHeight={blockHeight}>
            <PiqueChart 
                width={width} 
                height={height} 
                data={data} 
                options={options} 
                chartType={chartType} 
                rootProps={rootProps}
            />
        </MainHeaderContainer>
    )
}

export default MainHeader;