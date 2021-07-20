import React from 'react';
import { DashboardGrid, CardGroupWrapper, GroupWrapper, Group } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as CalendarChartProps from '../../charts/CalendarChartProps';
import * as LineChartProps from '../../charts/LineChartProps';
import * as TableChartProps from '../../charts/TableChartProps';

import { riskCardList } from './riskCardList';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';

const Dashboard = () => {
    const card = riskCardList.map((item, index)=>{
        return(
        <RiskCard color={item.bcolor} title={item.title} score={item.score} icon={item.icon} key={index}/>
    )})
    return (
        <DashboardGrid>
            <MainHeader
                width={CalendarChartProps.width}
                height={CalendarChartProps.height}
                data={CalendarChartProps.inputData}
                chartType={CalendarChartProps.chartType}
                options={CalendarChartProps.options}
                showButton={CalendarChartProps.showButton}
            />
            <CardGroupWrapper>
                {card}
            </CardGroupWrapper>
            <GroupWrapper>
                <Group>
                    <PiqueChart 
                        width={LineChartProps.width}
                        height={LineChartProps.height}
                        data={LineChartProps.inputData}
                        options={LineChartProps.options}
                        chartType={LineChartProps.chartType}
                        showButton={LineChartProps.showButton}
                    />
                </Group>
                <Group>
                    <PiqueChart
                        width={TableChartProps.width}
                        height={TableChartProps.height}
                        data={TableChartProps.inputData}
                        options={TableChartProps.options}
                        chartType={TableChartProps.chartType}
                        showButton={TableChartProps.showButton}
                    />
                </Group>
            </GroupWrapper>
        </DashboardGrid>
    )
}

export default Dashboard;