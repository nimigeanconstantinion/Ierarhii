import styled from "styled-components";

export const WrapperHome=styled.div.attrs({className:"divhome"})`
  width: 100vw;
  
  font-size: 1em;
  display: flex;
  flex-direction: row;
  
  .divcmd{
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: self-start;
    padding: 10px;
  }
  .btnadd{
   background-color: cadetblue;
    color: white;
    width: 100%;
    height: 60px;
    border-radius: 7px;
    display: block;
    line-height: .6em;
    margin: 5px 5px;
  }

  #container{
    width: 80%;
    height: auto;
    display: block;
    position: relative;
    
    overflow-y: auto;
  }
  #layer{
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
  }
.level{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
  
  .divchild{
    position: absolute;
    top: 10px;
    left: 10%;
  }
  
`