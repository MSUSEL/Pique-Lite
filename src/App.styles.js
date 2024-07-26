import styled from 'styled-components';

export const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

export const Headernav = styled.div`
  position: absolute;
  top: 0;
  left:
  width: 100%;
  height: 50px;
  background-color: #B9B7BD;
  z-index: 3;
`;

export const Sidenav = styled.div`
  position: absolute;
  top: 50px;
  left: -0.5vw;
  width: 240px;
  height: calc(100vh - 100px); /* Full height minus header and footer */
  background-color: transparent;
  z-index: 2;
`;

export const MainView = styled.div`
  position: absolute;
  top: 5vh;
  left: 5.5vh;
  width: 100%;
  height: 100%;
  background-color: #dee0e6;
  z-index: 1;
`;

export const FooterContainer = styled.div`
  position: absolute;
  bottom: -2vh;
  width: 110%;
  height: 50px;
  background-color: #B9B7BD;
  z-index: 1.5;
`;
