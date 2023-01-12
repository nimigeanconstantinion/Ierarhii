import Persoana from "../../models/Persoana";
import Card from "../Card/Card";
import {useEffect} from "react";
import TransitionWrapper from "react-bootstrap/TransitionWrapper";
import {WrapperLevel} from "./LevelStyle";


interface LevelProps{
    persoane: Persoana[]
}
const Level:React.FC<LevelProps>=({persoane})=>{

    useEffect(()=>{
        console.log("Sunt in LEVEL");
        console.log(persoane);
    },[])
    return(
        <WrapperLevel>
            {
                persoane.length>0?
                        (persoane.map(p=>(<Card persoana={p}/>)))
                    :""
            }

        </WrapperLevel>

    )
}

export default Level;