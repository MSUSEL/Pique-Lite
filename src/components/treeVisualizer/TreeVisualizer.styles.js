import styled from "styled-components";

export const TreeNode = styled.div`
   font-size: medium;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding-left: 10px;
`


export const ArrowButton = styled.button`
  display: flex;
  align-self: flex-end;
  vertical-align: middle;

  background-color: lightgrey;
  min-width: 50px;
  height: 50px;

  /* margin:auto; */
  padding: 0px;
  padding-left: 12px;
  margin-right: 0px;
  font-size: large;
  color: white;

  border: 1px solid darkgray;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  align-items: center;
`;

export const NodeLabel = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 240px;
  border: solid 2px #919192;
  padding: 5px;
  color: black;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
`
export const InfoIcon = styled.div`
  font-size: 30px;
  color: black;
  font-weight: 600;
  float: right;
`