import React, { useState } from 'react';
import { DashboardGrid, RiskCardGroupWrapper, CardGroupWrapper, GroupWrapper, Group, Header, HeaderTopRow } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as TableChartProps from '../../charts/TableChartProps';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectQuarters, selectRiskList } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import ArrowButton from '../../components/arrowButton/ArrowButton.component';
import { IoSkullOutline } from 'react-icons/io5';
import { ImWarning } from 'react-icons/im';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CgDanger } from 'react-icons/cg';
import HeatMap from '@uiw/react-heat-map';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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

    // variables for line chart
    const lineChartWidth = '600px';
    const lineChartHeight = '400px';
    const lineChartType = 'LineChart';
    const showButton = true;

    const getTitle = () => {
        let lineChartTitle = '';
        projects.map((file, index) => lineChartTitle = file.fileContent.name);
        return lineChartTitle;
    };

    const getlineChartOptions = () => {
        let options = {
            title: getTitle(),
            hAxis: { title: getTitle() + ' ' + 'Version', minValue: 0, maxValue: 1 },
            vAxis: { title: getTitle() + ' ' + 'Score', minValue: 0, maxValue: 1 },
            legend: 'none',
            colors: ['#226192', '#004411'],
            backgroundColor: 'white'
        };
        return options;
    };

    // get the bin data from uploaded files
    const getBinData = () => {
        let binData = [];
        binData.push(["version", "score"]);
        projects.map((file, index) => file["versionNumber"] = index + 1);
        projects.map((file, index) => binData.push([`v${file.versionNumber}`, file.fileContent.value]));
        return binData;
    };

    // Hard-coded data for HeatMap
    const heatMapData = [
        { date: '2024-01-01', count: 10 },
        { date: '2024-01-02', count: 20 },
        { date: '2024-01-03', count: 15 },
        { date: '2024-01-10', count: 5 },
        { date: '2024-01-15', count: 25 },
        { date: '2024-01-20', count: 30 },
        { date: '2024-02-01', count: 8 },
        { date: '2024-02-10', count: 12 },
        { date: '2024-02-15', count: 18 },
        { date: '2024-03-01', count: 22 },
        { date: '2024-03-10', count: 14 },
        { date: '2025-07-10', count: 14 }
    ].map(({ date, count }) => ({
        date: new Date(date),
        value: count
    }));

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
        }
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
        let options = {
            title: getTitle(),
            curveType: "function",
            legend: { position: "bottom" },
            allowHtml: true,
            width: '100%',
            height: '90%',
        };
        return options;
    };

    const getTableChartData = () => {
        let data = [];
        if (projects != null) {
            let files = projects.filter(file => file["QuarterNumber"] != null);
            let scores = [];
            scores.push("Score");
            quarters.map(q => scores.push(q));
            let tqi = [];
            tqi.push("TQI");
            files.map(f => tqi.push({ v: f.fileContent["value"] }));
            let size = 0;
            files.map(f => size = f.fileContent.children.length);
            data.push(scores);
            data.push(tqi);
            let names = [];
            let kids = [];
            files.map(file => kids.push(file.fileContent.children));
            for (let i = 0; i < size; i++) {
                names.push(kids[0][i].name);
            }
            for (let i = 0; i < size; i++) {
                let arr = [];
                arr.push(names[i]);
                files.map(f => arr.push({ v: parseFloat(f.fileContent.children[i].value).toFixed(3) }));
                data.push(arr);
            }
        }
        return data;
    };

    return (
        <DashboardGrid>
            <Header>
                <RiskCardGroupWrapper>{riskCard}</RiskCardGroupWrapper>
            </Header>

            <GroupWrapper style={{ justifyContent: 'flex-end' }}>
                <div style={{ width: '1000px', height: '300px', backgroundColor: 'white', padding: '20px' }}>
                    <HeatMap
                        width={800}
                        value={heatMapData}
                        startDate={new Date('2024-01-01')}
                        legendCellSize={legendSize}
                        rectRender={(props, data) => {
                            if (selectedDate !== '') {
                                props.opacity = data.date === selectedDate ? 1 : 0.45
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
                            chartType={lineChartType}
                            showButton={showButton}
                        />
                    ) : null}
                </Group>
                <Group>
                    <PiqueChart
                        width={TableChartProps.width}
                        height={TableChartProps.height}
                        data={projects ? getTableChartData() : null}
                        options={getTableChartOptions()}
                        chartType={TableChartProps.chartType}
                        showButton={TableChartProps.showButton}
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
