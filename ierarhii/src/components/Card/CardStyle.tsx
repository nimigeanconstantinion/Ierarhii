import styled from "styled-components";

export const WrapperCard = styled.div.attrs({className: "divcard"})`
  border: 1px solid gold;
  width: 200px;
  height: 80px;
  background-color: white;
  color: #282c34;
  font-size: 1em;
  padding: 0px;
  margin: 0px;
  margin: auto;
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
  
  button{
    position: absolute;
    bottom: 1px;
    left: 1px;
  }
 
  
  

  
`