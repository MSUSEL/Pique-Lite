import React from 'react';
import { DashboardGrid, CardGroupWrapper } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as CalendarChartProps from '../../charts/calendarChart/CalendarChartProps';
import { riskCardList } from './riskCardList';
import RiskCard from '../../components/riskCard/RiskCard.component';

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
        </DashboardGrid>
    )
}

export default Dashboard;