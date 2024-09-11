import styled from 'styled-components';

export const AppContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Headernav = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #B9B7BD;
  z-index: 3;
`;

export const Sidenav = styled.div`
  position: relative;
  top: 50px;
  margin-left: -10px;
  width: 250px; 
  background-color: transparent;
  z-index: 2;
`;

export const MainView = styled.div`
  margin-left: 20vh;
  padding: 1rem;
  width: calc(100% - 250px); 
  min-height: 100vh; 
  background-color: white;
  z-index: 1;
`;
