import {WrapperChild} from "./ChildStyle";
import React, {useRef} from "react";
import Persoana from "../../models/Persoana";
import { Button } from "react-bootstrap";


interface ChildProps{
    superior: Persoana,
    action: ()=>void
}

const Child:React.FC<ChildProps> =({superior,action}) => {
    const refFName = useRef<HTMLInputElement>(null);

    // const refPos:React.MutableRefObject<HTMLInputElement>=useRef("");

    let addClk=()=>{
           console.log("am apasat actiune");
            action();
    }
    return (
        <WrapperChild>
            <h2>Add Child</h2>
            <label>Full Name</label>
            <input type={"text"} className={"inpFullName"} ref={refFName}/>

            <label>Position </label>
            <input type={"text"} className={"inpPosition"} />
            <Button as="input" className={"btn"} type="button" value="Add Child" onClick={addClk}/>


            {/*<input className="btnab cancel" type="button" value="Cancel" />*/}

        </WrapperChild>
    );

}
export default Child;