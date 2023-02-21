import Persoana from "../../models/Persoana";
import Card from "../Card/Card";
import {useEffect} from "react";
import TransitionWrapper from "react-bootstrap/TransitionWrapper";
import {WrapperLevel} from "./LevelStyle";
import {Md5} from "ts-md5";
import uuid from 'react-uuid';

interface LevelProps{
    persoane: Persoana[],
    addChild: Function,
    delChild:Function,
    selChild:Function
}
const Level:React.FC<LevelProps>=({persoane,addChild,delChild,selChild})=>{

    useEffect(()=>{
        console.log("Sunt in LEVEL");
        console.log(persoane);
    },[])

    let addClick=(pers:Persoana)=>{
            addChild(pers);
    }
    let actionChild=(p:Persoana)=>{
            selChild(p);
    }

    let generateKey = (name:string):string => {
        //console.log("Cheie generata");
        //console.log(uuid());
        return uuid();
    }
    return(
        <WrapperLevel>
            {
                persoane.length>0?
                        (persoane.map((p,index)=>(<Card kk={generateKey(p.fullname)} persoana={p} addClick={addClick} delClick={delChild} selected={actionChild}/>))
                        )

                    :""
            }

        </WrapperLevel>

    )
}

export default Level;