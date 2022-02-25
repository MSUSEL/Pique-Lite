import React from 'react';
import { DashboardGrid, CardGroupWrapper, GroupWrapper, Group } from './Dashboard.styles';
import MainHeader from '../../components/mainHeader/MainHeader.component';
import * as TableChartProps from '../../charts/TableChartProps';
import RiskCard from '../../components/riskCard/RiskCard.component';
import PiqueChart from '../../charts/PiqueChart.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectQuarters, selectRiskList } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import ArrowButton from '../../components/arrowButton/ArrowButton.component';
import {IoSkullOutline} from 'react-icons/io5'
import {ImWarning} from 'react-icons/im';
import {RiAlarmWarningLine} from 'react-icons/ri'
import {RiSecurePaymentLine} from 'react-icons/ri'
import {CgDanger} from 'react-icons/cg';

import { data } from '../../dashboard-data-files/CalenderData';



const Dashboard = ({projects, riskList, quarters}) => {
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
            label: 'Elevated',
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

    // vairables for line chart
    const lineChartWidth = '600px';
    const lineChartHeight = '400px';
    const lineChartType = 'LineChart';
    const showButton = true;

    const getTitle = () => {
        let lineChartTitle = '';
        projects.map((file, index) => lineChartTitle = file.fileContent.name)
        return lineChartTitle;
    }

    const getlineChartOptions = () => {
        let options = {
            title: getTitle(),
            hAxis: { title: getTitle() + ' ' + 'Version', minValue: 0, maxValue: 1 },
            vAxis: { title: getTitle() + ' ' + 'Score', minValue: 0, maxValue: 1 },
            legend: 'none',
            colors:['#226192','#004411'],
            backgroundColor: 'white'
        }
        return options;
    }

    // get the bin data from uploajded files
    const getBinData = () => {
        let binData = [];
        binData.push(["version", "score"]);
        projects.map((file, index) => file["versionNumber"] = index + 1);
        projects.map((file, index) => binData.push([`v${file.versionNumber}`, file.fileContent.value]));
        return binData;
    }

    // get variable for calendar chart
    const calWidth = '1000px';
    const calHeight = '180px';
    const calChartType = 'Calendar';
    const showCalButton = false;
    const inputData = data;
    
    const calOptions = {
        title: getTitle() + ' Score',
        calendar: {
            cellColor: {
            stroke: 'grey',      // Color the border of the squares.
            strokeOpacity: 0.5, // Make the borders half transparent.
            strokeWidth: 2      // ...and two pixels thick.

            },
            cellSize: '15',
            dayOfWeekLabel: {
                fontName: 'Times-Roman',
                fontSize: 12,
                color: 'black',
                bold: false,
                italic: true
            },
            focusedCellColor: {
                stroke: 'red',
                strokeOpacity: 0.8,
                strokeWidth: 3
            },
            monthOutlineColor: {
                stroke: '#226192',
                strokeOpacity: 0.8,
                strokeWidth: 2
            },
            underYearSpace: 10, // Bottom padding for the year labels.
            yearLabel: {
                fontName: 'Times-Roman',
                fontSize: 32,
                color: '#132D72',
                bold: true,
                italic: true
            }
        },
        colorAxis: {colors:['#ff6150','#38b24d']}
}
  
    const card = riskList.map((file, index) => {
        return (<RiskCard title={file.qaName} score={file.qaValue} color={file.qaColor} icon={file.qaIcon} key={index}/>)
    })

    const riskCard = riskLevelOptions.map((item, index) => {
        return (<RiskCard title={item.label} color={item.value} icon={item.icon}/>)
    })

    const getTableChartOptions = () => {
        let options = {
            title: getTitle(),
            curveType: "function",
            legend: { position: "bottom" },
            allowHtml: true,
            width: '100%', 
            height: '90%',
        }
        return options;
    }
    const getTableChartData = () => {
        let data = []
        if (projects != null) {
            let files = projects.filter(file => file["QuarterNumber"] != null);
            let scores =[]
            scores.push("Score");
            quarters.map(q => scores.push(q));
            let tqi = []
            tqi.push("TQI");
            files.map(f => tqi.push({v:f.fileContent["value"]}));
            let size = 0;
            files.map(f => size = f.fileContent.children.length);
            data.push(scores);
            data.push(tqi)
            let names = []
            let kids =[]
            files.map(file => kids.push(file.fileContent.children) )
            for (let i =0; i<size; i++) {
                names.push(kids[0][i].name);
            }
            for (let i= 0; i<size; i++ ) {
                let arr = [];
                arr.push(names[i]);
                files.map(f => arr.push({v: parseFloat(f.fileContent.children[i].value).toFixed(3)}))
                data.push(arr)
            }
        }
          return data;
      }

    return (
        <DashboardGrid>
            <MainHeader
                width={calWidth}
                height={calHeight}
                data={inputData}
                chartType={calChartType}
                options={calOptions}
                showButton={showCalButton}
            />
            <div>
                <CardGroupWrapper>{riskCard}</CardGroupWrapper>
            </div>
            <div>
                {projects? (<div>
                    <ArrowButton>show projects</ArrowButton>
                    <CardGroupWrapper>
                        {card}
                    </CardGroupWrapper>
                    </div>) : null}
            
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
                    />) : null}
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
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
    riskList: selectRiskList,
    quarters: selectQuarters
})

export default connect(mapStateToProps)(Dashboard)