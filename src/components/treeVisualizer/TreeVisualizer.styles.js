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
