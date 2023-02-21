import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export const WrapperChild=styled.div.attrs({className:"divchild"})`
    width: 80%;
    height: 500px;
    position: absolute;
    z-index: 100;
    top: auto;
    margin:auto;
    background-color: wheat;
    display: flex;
    flex-direction: column;

  input[type="text"]{
    width: 70%;
    margin: 10px auto;
    height: 35px;
    border-radius: 3px;
    border: 1px solid rgb(100, 100, 100);
  }
  label{
    margin-left: 5px;
  }
  .btn{
    width: 30%;
    margin: 5px 10px;
  }
  
  .btn.add{
    background-color: darkgreen;
  }



`
