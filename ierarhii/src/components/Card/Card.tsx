import Persoana from "../../models/Persoana";
import {WrapperCard} from "./CardStyle";
import {useEffect, useState} from "react";
import Child from "../Child/Child";
interface CardProps{

    persoana:Persoana,
    addClick:Function,
    delClick:Function

}


const  Card:React.FC<CardProps>=({persoana,addClick,delClick}:CardProps)=>{

    const [swAdd,setswAdd]=useState(0);


    useEffect(()=>{
     if(persoana.id==0){

        //  let lista:Object=document.getElementsByClassName("divcard");
        //  let elems=Object.values(lista);
        // // console.log(elems.length);
        //  let id=elems.filter(c=>c.children[3].textContent==persoana.id.toString())[0].children[3].textContent;
         console.log("Card pentru "+persoana.id);

         // let card=elems.filter(c=>c.getElementById("idP").innerHTML==persoana.id)[0];
         // if(card){
         //     console.log(card);
         // }
     }
    },[])

    let addClk=()=>{
            addClick(persoana);

    }

    let delClk=()=>{
        delClick(persoana);

    }

    return (
        <>

            <WrapperCard className={"divcard"}>
                <button id={"btna"} onClick={addClk}>+</button>
                <button id={"btnm"} onClick={delClk}>-</button>
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