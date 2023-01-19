import styled from "styled-components";

export const WrapperHome=styled.div.attrs({className:"divhome"})`
  width: 100vw;
  height: 100vh;
  font-size: 1em;
  display: flex;
  flex-direction: row;

  .divcmd{
    width: 20%;
    display: flex;
    flex-direction: column;
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
  }

  #container{
    width: 80%;
    height: 100vh;
    display: block;
    position: relative;
    
    
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