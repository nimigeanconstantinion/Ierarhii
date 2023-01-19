import Persoana from "../../models/Persoana";
import Card from "../Card/Card";
import {useEffect} from "react";
import TransitionWrapper from "react-bootstrap/TransitionWrapper";
import {WrapperLevel} from "./LevelStyle";


interface LevelProps{
    persoane: Persoana[],
    addChild: Function
}
const Level:React.FC<LevelProps>=({persoane,addChild})=>{

    useEffect(()=>{
        console.log("Sunt in LEVEL");
        console.log(persoane);
    },[])

    let addClick=(pers:Persoana)=>{
            addChild(pers);
    }
    let actionChild=()=>{

    }
    return(
        <WrapperLevel>
            {
                persoane.length>0?
                        (persoane.map(p=>(<Card persoana={p} addClick={addClick}/>)))
                    :""
            }

        </WrapperLevel>

    )
}

export default Level;