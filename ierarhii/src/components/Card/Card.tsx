import Persoana from "../../models/Persoana";
import {WrapperCard} from "./CardStyle";
import {useEffect, useState} from "react";
import Child from "../Child/Child";
import { Tooltip } from 'primereact/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus,faSquareMinus } from '@fortawesome/free-solid-svg-icons'

interface CardProps{
    persoana:Persoana,
    addClick:Function,
    delClick:Function,
    selected:Function,
    kk:string

}


const  Card:React.FC<CardProps>=({persoana,addClick,delClick,selected,kk}:CardProps)=>{

    const [swAdd,setswAdd]=useState(0);


    useEffect(()=> {


        if (persoana.id == 0) {
               let elem=Array.from(document.getElementsByClassName("divcard"));
               elem.map(c=>{

                   let elm=c.children[2];
                   if(elm.textContent==""){
                      const x= (c as HTMLDivElement);
                      x.style.visibility="hidden";
                   }else{
                       const x= (c as HTMLDivElement);
                       x.style.visibility="visible";
                   }
               });

        }

    });

    let addClk=()=>{
            addClick(persoana);

    }

    let delClk=()=>{
        delClick(persoana);

    }
    let selPers=()=>{
        selected(persoana);
    }

    return (
        <>

            <WrapperCard className={"divcard"} onClick={selPers}>
                {/*<button id={"btna"} onClick={addClk}>+</button>*/}
                <FontAwesomeIcon id={"btna"}  onClick={addClk} icon={faSquarePlus} />

                <FontAwesomeIcon id={"btnm"}  onClick={delClk} icon={faSquareMinus} />
                {/*<button id={"btnm"} onClick={delClk}>-</button>*/}
                <p className={"divc name"}>{persoana.fullname}</p>
                <p className={"divc func"}>{persoana.position}</p>
                {
                    persoana.age>0?(
                            <p className={"divc age"}>Age :{persoana.age.toString()}</p>

                    ):""
                }
                {
                    persoana.salary>0?(
                        <p className={"divc salary"}>Salary :{persoana.salary.toString()}</p>

                    ):""
                }
                <p id={"idP"} hidden={true}>{persoana.id.toString()}</p>
            </WrapperCard>

                {/*{swAdd>0?*/}
                {/*        <>*/}
                {/*           <Child superior={persoana} action={addChild}/>*/}
                {/*        </>*/}
                {/*    :""*/}
                {/*}*/}

        </>
    );
}



export default Card;