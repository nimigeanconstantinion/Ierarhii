import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export const WrapperChild=styled.div.attrs({className:"divchild"})`
    width: 85%;
    height: 500px;
    position: absolute;
    z-index: 100;
    top: auto;
    
    background-color: wheat;
    display: flex;
    flex-direction: column;

  input[type="text"]{
    width: 70%;
    margin: 10px 5px;
    height: 35px;
    border-radius: 3px;
    border: 1px solid rgb(100, 100, 100);
  }
  label{
    margin-left: 5px;
  }
  .btn{
    width: 20%;
  }
`