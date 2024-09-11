import React, { useState } from 'react';
import {
  DashboardGrid, RiskCardGroupWrapper, CardGroupWrapper, GroupWrapper, Group, Header, RiskListGroupWrapper
} from './Dashboard.styles';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectQuarters, selectRiskList } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import ArrowButton from '../../components/arrowButton/ArrowButton.component';
import { IoSkullOutline } from 'react-icons/io5';
import { ImWarning } from 'react-icons/im';
import { RiAlarmWarningLine, RiSecurePaymentLine } from 'react-icons/ri';
import { CgDanger } from 'react-icons/cg';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@mui/material/Tooltip';
import { heatMapData } from '../../dashboard-data-files/CalenderData';

const Dashboard = ({ projects, riskList, quarters }) => {
    const getCombinedChartData = () => {
        return projects.map((project, index) => ({
            data: project.fileContent.children.map(child => ({
                name: child.name,
                value: parseFloat(child.value).toFixed(3),
            })),
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        }));
    };

    const [selectedDate, setSelectedDate] = useState('');
    const [legendSize] = useState(0);
    const chartOptions = {
        xAxisKey: 'name',
        yAxisKey: 'value',
    };

    const riskLevelOptions = [
        {
            label: 'Severe',
            value: '#FEEBEC',
            icon: <IoSkullOutline />,
            fontColor: '#cb0032',
            range: '0 - 0.2'
        },
        {
            label: 'High',
            value: '#FFEFD6',
            icon: <RiAlarmWarningLine />,
            fontColor: '#CC4E00',
            range: '0.2 - 0.4'
        },
        {
            label: 'Medium',
            value: '#FFFAB8',
            icon: <CgDanger />,
            fontColor: '#9E6C00',
            range: '0.4 - 0.6'
        },
        {
            label: 'Low',
            value: '#E6F4FE',
            icon: <ImWarning />,
            fontColor: '#0C73CE',
            range: '0.6 - 0.8'
        },
        {
            label: 'Insignificant',
            value: '#E6F6EB',
            icon: <RiSecurePaymentLine />,
            fontColor: '#1E8255',
            range: '0.8 - 1'
        }
    ];

    const riskCard = riskLevelOptions.map((item, index) => (
        <Tooltip title={item.range} arrow placement="top" key={index}>
            <div>
                <RiskCard title={item.label} color={item.value} icon={item.icon} fontColor={item.fontColor} />
            </div>
        </Tooltip>
    ));

    const riskCardList = riskList.map((file, index) => (
        <Tooltip title={`Score: ${file.qaValue}`} arrow placement="top" key={index}>
            <div>
                <RiskCard title={file.qaName} color={file.qaColor} icon={file.qaIcon} />
            </div>
        </Tooltip>
    ));

    return (
        <DashboardGrid style={{ minHeight: '100vh' }}>
            <Header>
                <RiskCardGroupWrapper>{riskCard}</RiskCardGroupWrapper>
            </Header>

            <GroupWrapper style={{ marginLeft: '15vw'}}>
                {/* <div>
                    <HeatMap
                        width={800}
                        value={heatMapData}
                        startDate={new Date('2021-01-01')}
                        legendCellSize={legendSize}
                        rectRender={(props, data) => {
                            if (selectedDate !== '') {
                                props.opacity = data.date === selectedDate ? 1 : 0.45;
                            }
                            return (
                                <rect {...props} onClick={() => {
                                    setSelectedDate(data.date === selectedDate ? '' : data.date);
                                }} />
                            );
                        }}
                    />
                </div> */}
            </GroupWrapper>

            <div>
                {projects ? (
                    <div>
                        <ArrowButton>Show Projects</ArrowButton>
                        <RiskListGroupWrapper>
                            {riskCardList}
                        </RiskListGroupWrapper>
                    </div>
                ) : null}
            </div>

            <GroupWrapper>
                <Group style={{ paddingLeft: '600px' }}>
                    {projects && (
                        <PiqueChart
                            projects={getCombinedChartData()}  
                            options={chartOptions}  
                        />
                    )}
                </Group>
            </GroupWrapper>
        </DashboardGrid>
    );
};

const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
    riskList: selectRiskList,
    quarters: selectQuarters
});

export default connect(mapStateToProps)(Dashboard);
