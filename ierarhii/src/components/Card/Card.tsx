import Persoana from "../../models/Persoana";
import {WrapperCard} from "./CardStyle";
import {useState} from "react";
import Child from "../Child/Child";
interface CardProps{

    persoana:Persoana,
    addClick:Function

}


const  Card:React.FC<CardProps>=({persoana,addClick}:CardProps)=>{

    const [swAdd,setswAdd]=useState(0);


    let addClk=()=>{
            addClick(persoana);

    }

    return (
        <>

            <WrapperCard>
                <button onClick={addClk}>+</button>
                <p className={"divc name"}>{persoana.fullname}</p>
                <p className={"divc func"}>{persoana.position}</p>
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