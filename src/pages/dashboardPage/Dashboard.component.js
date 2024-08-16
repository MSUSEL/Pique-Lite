import React, { useState } from 'react';
import { DashboardGrid, RiskCardGroupWrapper, CardGroupWrapper, GroupWrapper, Group, Header } from './Dashboard.styles';
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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { heatMapData } from '../../dashboard-data-files/CalenderData';

const Dashboard = ({ projects, riskList, quarters }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [legendSize, setLegendSize] = useState(0);

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

    const lineChartWidth = '100%';
    const lineChartHeight = '100%';

    const getTitle = () => {
        let lineChartTitle = '';
        projects.map((file) => lineChartTitle = file.fileContent.name);
        return lineChartTitle;
    };

    const getlineChartOptions = () => {
        return {
            xAxisKey: 'version',
            yAxisKey: 'score',
        };
    };

    const getBinData = () => {
        let binData = [];
        projects.map((file, index) => {
            file["versionNumber"] = index + 1;
            binData.push({ version: `v${file.versionNumber}`, score: file.fileContent.value });
        });
        return binData;
    };

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
    ))(({ theme, bgcolor, fontcolor }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: bgcolor,
            color: fontcolor,
            boxShadow: theme.shadows[1],
            fontSize: 14,
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: bgcolor,
        },
    }));

    const riskCard = riskLevelOptions.map((item, index) => (
        <CustomTooltip title={item.range} bgcolor={item.value} fontcolor={item.fontColor} key={index}>
            <div>
                <RiskCard title={item.label} color={item.value} icon={item.icon} fontColor={item.fontColor} />
            </div>
        </CustomTooltip>
    ));

    const card = riskList.map((file, index) => (
        <RiskCard title={file.qaName} score={file.qaValue} color={file.qaColor} icon={file.qaIcon} key={index} />
    ));

    const getTableChartOptions = () => {
        return {
            xAxisKey: 'name',
            yAxisKey: 'score',
        };
    };

    const getTableChartData = () => {
        let data = [];
        if (projects != null) {
            let files = projects.filter(file => file["QuarterNumber"] != null);
            files.map(f => f.fileContent.children.forEach(child => data.push({
                name: child.name,
                score: parseFloat(child.value).toFixed(3),
            })));
        }
        return data;
    };

    return (
        <DashboardGrid style={{ minHeight: '250vh', paddingBottom: '50px' }}>
            <Header>
                <RiskCardGroupWrapper>{riskCard}</RiskCardGroupWrapper>
            </Header>

            <GroupWrapper style={{ justifyContent: 'flex-end' }}>
                <div style={{ width: '1000px', height: '300px', backgroundColor: 'white', padding: '20px' }}>
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
                </div>
            </GroupWrapper>

            <div>
                {projects ? (
                    <div>
                        <ArrowButton>Show Projects</ArrowButton>
                        <CardGroupWrapper>
                            {card}
                        </CardGroupWrapper>
                    </div>
                ) : null}
            </div>
            <GroupWrapper>
                <Group>
                    {projects ? (
                        <PiqueChart
                            width={lineChartWidth}
                            height={lineChartHeight}
                            data={getBinData()}
                            options={getlineChartOptions()}
                            showButton={true}
                        />
                    ) : null}
                </Group>
                <Group>
                    <PiqueChart
                        width="100%"
                        height={400}
                        data={projects ? getTableChartData() : null}
                        options={getTableChartOptions()}
                        showButton={false}
                    />
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
