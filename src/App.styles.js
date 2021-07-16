import styled, {css} from 'styled-components';
const withbar = css`
grid-template-columns: 240px 1fr;
`

const withoutbar = css`
grid-template-columns: 0 1fr;
`

const getShowBar = props => {
    if (props.hidden) {
    return withoutbar
    }

    return withbar
};

export const AppGrid= styled.div`
    display: grid;
    ${getShowBar}
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
    "sidenav headernav"
    "sidenav mainview"
    "sidenav footer";
    height: 100vh;
`
export const Headernav = styled.div`
    grid-area: headernav;
    background-color: #B9B7BD;
`
export const Sidenav = styled.div`
    grid-area: sidenav;
    background-color: #134e6f;
`

export const Mainview = styled.div`
    grid-area: mainview;
    background-color: #dee0e6 ;
`

export const FooterContainer = styled.div`
    grid-area: footer;
    background-color: #B9B7BD ;
`