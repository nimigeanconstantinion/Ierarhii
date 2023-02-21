import styled from "styled-components";

export const WrapperCard = styled.div.attrs({className: "divcard"})`
  border: none;
  border-radius: 5px;
  width: 200px;
  height: 100px;
  background-color: white;
  color: #282c34;
  background-color: wheat;
  font-size: .6em;
  padding: 2px;
  margin: 2px 2px;
  
  line-height: .8em;
  position: relative;
  
  
 
  .divc{
    padding: 0px;
    margin: 4px 0px;
  }
  .divc.name{
    color: red;
    margin-bottom: 7px;
  }
  
 #btna{
    position: absolute;
    z-index: 98;
    color: darkgreen;
    bottom: 6px;
    left: 2px;
    border: none;
    font-size: 1.5em;
    font-weight: bold;
    display: none;
    background: none;
  }
  
  //.divcard.divhide{
  //  display: block;
  //  visibility: hidden;
  //
  //}
  #btnm{
    position: absolute;
    z-index: 98;
    color: red;
    top: 6px;
    left: 2px;
    border: none;
    font-size: 1.5em;
    font-weight: bold;
    display: none;
    background: none;
  }
  &:hover{
    background-color: lightblue;
    & #btna,#btnm{
      display: block;
    }
  }
 
  
  



`