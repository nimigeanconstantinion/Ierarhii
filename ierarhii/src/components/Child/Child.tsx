import {WrapperChild} from "./ChildStyle";
import React, {MutableRefObject, useRef} from "react";
import Persoana from "../../models/Persoana";
import { Button } from "react-bootstrap";
import Manager from "../../models/Manager";
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';



interface ChildProps{
    superior: Persoana,
    action: (newPers: Persoana)=>void
}

const Child:React.FC<ChildProps> =({superior,action}) => {
    const refFName = React.useRef<HTMLInputElement>(null);
    const refPosition= React.useRef<HTMLInputElement>(null);
    const refAge= React.useRef<HTMLInputElement>(null);
    const refSalary= React.useRef<HTMLInputElement>(null);

    // const refPos:React.MutableRefObject<HTMLInputElement>=useRef("");

    let addClk=()=>{
           console.log("am apasat actiune");
           let manager:Manager={
               idManager: null,
               fullname:null,
               position:null,
               age:0,
               salary:0

           }

            let id=0;
           let fn=refFName.current !== undefined ? refFName.current!.value :"";
           let pos=refPosition.current !==undefined? refPosition.current!.value:"";
           let a=refAge.current!==undefined?refAge.current!.value:0;
           let s=refSalary.current!==undefined?refSalary.current!.value:0;

            let newPers:Persoana= new Persoana(id,fn,pos,+a,+s,manager);
            console.log("---------Noua PERSOANA");
            console.log(newPers);
           //     fullname :refFName.current !== undefined ? refFName.current!.value :"",
           //     position:refPosition.current !==undefined? refPosition.current!.value:"",
           //     age:refAge.current!==undefined?+refAge.current!.value:0,
           //     salary:refSalary.current!==undefined?+refSalary.current!.value:0,
           //     parinte: manager
           // }
            action(newPers);
    }
    return (
        <WrapperChild>
            <h2>Add Child</h2>
            <label>Full Name</label>
            <InputText type={"text"} className={"inpFullName"} ref={refFName} tooltip="Enter your username" tooltipOptions={{ position: 'top' }}/>

            <label>Position </label>
            <input type={"text"} className={"inpPosition"} ref={refPosition}/>

            <label>Age</label>
            <input type={"text"} className={"inpAge"} ref={refAge}/>

            <label>Salary </label>
            <input type={"text"} className={"inpSalary"} ref={refSalary}/>

            <Button as="input" className={"btn add"} type="button" value="Add Child" onClick={addClk}/>
            <Button as="input" className={"btn cancel"} type="button" value="Cancel" onClick={addClk}/>


            {/*<input className="btnab cancel" type="button" value="Cancel" />*/}

        </WrapperChild>
    );

}
export default Child;