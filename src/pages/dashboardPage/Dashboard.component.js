import React from 'react';
import { DashboardGrid, CardGroupWrapper, GroupWrapper, Group } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as CalendarChartProps from '../../charts/CalendarChartProps';
import * as LineChartProps from '../../charts/LineChartProps';
import * as TableChartProps from '../../charts/TableChartProps';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectRiskList } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import ArrowButton from '../../components/arrowButton/ArrowButton.component';
import EditorButton from '../../components/editorButtion/EditorButton.component';
import {IoSkullOutline} from 'react-icons/io5'
import {ImWarning} from 'react-icons/im';
import {RiAlarmWarningLine} from 'react-icons/ri'
import {RiSecurePaymentLine} from 'react-icons/ri'
import {CgDanger} from 'react-icons/cg';
import {SiWarnerbrosDot} from 'react-icons/si'


const Dashboard = ({projects, riskList}) => {
    const riskLevelOptions = [   
        {
            label: 'Severe',
            value: '#cb0032',
            icon: <IoSkullOutline/>
        },
        {
            label: 'High',
            value: '#ff6500',
            icon: <RiAlarmWarningLine/>
        },
        {
            label: 'Evlevated',
            value: '#fde101',
            icon: <CgDanger/>
        },
        {
            label: 'Guarded',
            value: '#3566cd',
            icon: <ImWarning/>
        },
        {
            label: 'Low',
            value: '#009a66',
            icon: <RiSecurePaymentLine/>
        }  
]

    // get the bin data from uploajded files
    const getBinData = () => {
        let binData = [];
        binData.push(["version", "score"]);
        projects.map((file, index) => binData.push([`v${file.versionNumber}`, file.fileContent.value]));
        return binData;
    }

    
    const card = riskList.map((file, index) => {
        return (<RiskCard title={file.qaName} score={file.qaValue} color={file.qaColor} icon={file.qaIcon} key={index}/>)
    })

    const riskCard = riskLevelOptions.map((item, index) => {
        return (<RiskCard title={item.label} color={item.value} icon={item.icon}/>)
    })

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
            <div>
                <CardGroupWrapper>{riskCard}</CardGroupWrapper>
            </div>
            <div>
                <ArrowButton>show projects</ArrowButton>
                <CardGroupWrapper>
                    {card}
                </CardGroupWrapper>
            </div>

            <GroupWrapper>
                <Group>
                    <PiqueChart 
                        width={LineChartProps.width}
                        height={LineChartProps.height}
                        data={getBinData()}
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
    projects: selectProjects,
    riskList: selectRiskList
})

export default connect(mapStateToProps)(Dashboard)