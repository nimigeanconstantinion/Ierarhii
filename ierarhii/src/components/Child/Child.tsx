import {WrapperChild} from "./ChildStyle";
import React, {MutableRefObject, useRef} from "react";
import Persoana from "../../models/Persoana";
import { Button } from "react-bootstrap";
import Manager from "../../models/Manager";


interface ChildProps{
    superior: Persoana,
    action: (newPers: Persoana)=>void
}

const Child:React.FC<ChildProps> =({superior,action}) => {
    const refFName = React.useRef<HTMLInputElement>(null);
    const refPosition= React.useRef<HTMLInputElement>(null);
    // const refPos:React.MutableRefObject<HTMLInputElement>=useRef("");

    let addClk=()=>{
           console.log("am apasat actiune");
           let manager:Manager={
               idManager: null,
               fullname:null,
               position:null

           }



           let newPers:Persoana={
               id: 0,
               fullname :refFName.current !== undefined ? refFName.current!.value :"",
               position:refPosition.current !==undefined? refPosition.current!.value:"",
               parinte: manager
           }
            action(newPers);
    }
    return (
        <WrapperChild>
            <h2>Add Child</h2>
            <label>Full Name</label>
            <input type={"text"} className={"inpFullName"} ref={refFName}/>

            <label>Position </label>
            <input type={"text"} className={"inpPosition"} ref={refPosition}/>
            <Button as="input" className={"btn"} type="button" value="Add Child" onClick={addClk}/>


            {/*<input className="btnab cancel" type="button" value="Cancel" />*/}

        </WrapperChild>
    );

}
export default Child;