import styled from 'styled-components';

export const DashboardGrid = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: mainview;
    font-family: Arial, sans-serif;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: #f9f9f9;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    box-sizing: border-box; 
`;

export const NavTabs = styled.div`
    display: flex;
    border-bottom: 1px solid #ddd;
`;

export const Tab = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #f1f1f1;
    }
`;

export const MainContent = styled.div`
    display: flex;
    padding: 20px;
`;

export const OverviewSection = styled.div`
    flex: 2;
    padding-right: 20px;
`;

export const SectionHeader = styled.h2`
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
`;

export const SectionContent = styled.div`
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const TQI = styled.div`
    text-align: center;
    p {
        font-size: 16px;
        margin: 0;
    }
    h3 {
        font-size: 28px;
        color: #007bff;
        margin: 0;
    }
`;

export const ProjectName = styled.div`
    margin-top: 20px;
    p {
        font-size: 16px;
        margin: 0;
        color: #666;
    }
`;

export const ScoreCategories = styled.div`
    display: flex;
    gap: 10px;
`;

export const ScoreCategory = styled.div`
    padding: 10px 20px;
    border-radius: 5px;
    &.severe {
        background-color: #FEEBEC;
        color: #cb0032;
    }
    &.high {
        background-color: #FFEFD6;
        color: #000000;
    }
    &.medium {
        background-color: #FFFAB8;
        color: #000000;
    }
    &.low {
        background-color: #E6F4FE;
        color: #000000;
    }
    &.insignificant {
        background-color: #E6F6EB;
        color: #000000;
    }
`;

export const DetailsSection = styled.div`
    flex: 1;
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const Scores = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ScoreBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &.characteristics { background-color: #f8f9fa; }
    &.factors { background-color: #f1f1f1; }
    &.measures { background-color: #e9ecef; }
    &.diagnostics { background-color: #e0e0e0; }
`;

export const EditData = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background-color: #0056b3;
        }
    }
`;

export const ErrorMessage = styled.div`
    padding: 10px 20px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    margin-top: 20px;
`;

export const GroupWrapper = styled.div`
    column-count: 2;
    column-gap: 20px;
    margin-right: 20px;
    margin-left: 20px;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    -webkit-column-break-inside: avoid;
    padding: 24px;
    box-sizing: border-box;
`;

export const CardGroupWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
    grid-auto-rows: 94px;
    grid-gap: 20px;
    margin: 20px;
`;

export const LogoIcon = styled.img`
    width: auto; 
    max-width: 150px; 
    max-height: 75px;
    padding-right: 1vw;
`;

export const PiqueIcon = styled.img`
    width: auto; 
    max-width: 130px; 
    max-height: 130px;
    padding-left: 1vw;
`;