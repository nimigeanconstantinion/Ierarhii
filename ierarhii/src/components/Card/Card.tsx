import Persoana from "../../models/Persoana";
import {WrapperCard} from "./CardStyle";
import {useState} from "react";
import Child from "../Child/Child";
interface CardProps{

    persoana:Persoana
}


const  Card:React.FC<CardProps>=({persoana}:CardProps)=>{

    const [swAdd,setswAdd]=useState(0);


    let addChild=()=>{
        if(swAdd==0){
            setswAdd(1);

        }else{
            setswAdd(0);
        }
    }

    return (
        <>

            <WrapperCard>
                <button onClick={addChild}>+</button>
                <p className={"divc name"}>{persoana.fullname}</p>
                <p className={"divc func"}>{persoana.position}</p>
            </WrapperCard>

                {swAdd>0?
                        <>
                           <Child superior={persoana} action={addChild}/>
                        </>
                    :""
                }

        </>
    );
}



export default Card;