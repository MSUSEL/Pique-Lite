import styled from 'styled-components';
import {Link} from 'react-router-dom'

export const HeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    cursor: pointer;
    color: white;
    font-size: large;
    padding-top: 5px;
    margin-bottom: 10px;
    margin-right: 20px;
    font-weight: 600;
    text-decoration: none;   
`

export const HeaderSearch = styled.div`
  margin-left: 55px;
  font-size: 20px;
 
`

export const SearchInput = styled.div`
  border: none;
  background: transparent;
  padding: 12px;
  font-size: 20px;
  color: white;

  &:focus {
      outline: none;
      border: none;
  }`

export const Toggle = styled.div`
  font-size: 30px;
  color: white;
  position: relative;
  display: inline-block;
`
