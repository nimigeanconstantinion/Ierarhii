import {WrapperChild} from "./ChildStyle";
import React, {MutableRefObject, useRef} from "react";
import Persoana from "../../models/Persoana";
import { Button } from "react-bootstrap";
import Manager from "../../models/Manager";


interface ChildProps{
    superior: Persoana,
    action: (newPers: Persoana)=>void
}

const NewBinaryChild:React.FC<ChildProps> =({superior,action}) => {
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



           let newPers=new Persoana(0,"","",0,0,manager);
           newPers.id=0;
           newPers.fullname=refFName.current !== undefined ? refFName.current!.value :"";
           newPers.position=refPosition.current !==undefined? refPosition.current!.value:"";
           newPers.age=refAge.current!==undefined?+refAge.current!.value:0;
           newPers.salary=refSalary.current!==undefined?+refSalary.current!.value:0;
           newPers.parinte=manager;
           // {
           //     id: 0,
           //     fullname :refFName.current !== undefined ? refFName.current!.value :"",
           //     position:refPosition.current !==undefined? refPosition.current!.value:"",
           //     age:refAge.current!==undefined?+refAge.current!.value:0,
           //     salary:refSalary.current!==undefined?+refSalary.current!.value:0,
           //     parinte: manager
           // }
            action(newPers);
    }

    return (
        <WrapperChild className={"divchild"}>
            <h2>Add Child</h2>
            <label>Full Name</label>
            <input type={"text"} className={"inpFullName"} ref={refFName}/>

            <label>Position </label>
            <input type={"text"} className={"inpPosition"} ref={refPosition}/>

            <label>Age</label>
            <input type={"text"} className={"inpAge"} ref={refAge}/>

            <label>Salary </label>
            <input type={"text"} className={"inpSalary"} ref={refSalary}/>

            <div className={"divbutoane"}>

                <Button as="input" className={"btnadc"} type="button" value="Add Child" onClick={addClk}/>
                <Button as="input" className={"btncancel"} type="button" value="Cancel" onClick={addClk}/>

            </div>


            {/*<input className="btnab cancel" type="button" value="Cancel" />*/}

        </WrapperChild>
    );

}
export default NewBinaryChild;