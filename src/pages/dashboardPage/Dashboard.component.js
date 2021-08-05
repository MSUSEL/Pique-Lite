import React from 'react';
import { DashboardGrid, CardGroupWrapper, GroupWrapper, Group } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as CalendarChartProps from '../../charts/CalendarChartProps';
import * as LineChartProps from '../../charts/LineChartProps';
import * as TableChartProps from '../../charts/TableChartProps';

import { riskCardList } from './riskCardList';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';

const Dashboard = ({projects}) => {

    const getBinData = () => {
        let binData = [[]];
        binData.push(["version", "score"]);
        projects.map((file, index) => binData.push([file.versionNumber, file.fileContent]));
        return binData;
    }

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

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

export default connect(mapStateToProps)(Dashboard)