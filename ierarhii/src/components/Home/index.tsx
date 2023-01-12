import Card from "../Card/Card";
import Persoana from "../../models/Persoana";
import {WrapperHome} from "./HomeStyle";
import Api from "../../Api";
import {constants} from "os";
import ResponseImpl from "../../models/ResponseImpl";
import Level from "../Level/Level";
import {useState} from "react";
import Tree from "../../models/Tree";
import Nod from "../../models/Nod";



function Index(){
  let levels:Array<Array<Persoana>>;
    // let p:Persoana= {
    //     fullname: "Marculescu Bogdan",
    //     position: "CEO"
    // }


  //  const [lista,setLista]=useState([] as Persoana[]);
    const [lista,setLista]=useState(Object);
    const [organigrama,setOrganigrama]=useState(null);

   let loadLista= async ():Promise<ResponseImpl<Persoana[]>> => {
        console.log("Sunt in load lista");
        let api=new Api();
        try {
            let response = await api.getPersons();
            console.log(response);

            if(response) {

                setLista(response);
            }else{
                console.log("eroare");
            }

            return response;

        } catch (e) {
            console.log("Eroareee");
            throw new Error("ieooioeoi");
        }
        return Promise.reject("error");

    }

    let loadTree=(tabel:Persoana[]):void=>{

       let root={
           data:findRoot(tabel)
       }

        let tree = new Tree(root);

       let ct=0;
       while (tabel.length==0){


           if(tabel[0].fullname===root.data?.fullname){


               tabel.shift();
           }else if(tree.add(tabel[0].parinte,tabel[0])){


               tabel.shift();




           }else{

               tabel.push(tabel[0]);
               tabel.shift();
           }
       }


    }


    let findRoot=(listaPers:Persoana[]):Persoana|null=>{
       return listaPers.filter(p=>p.parinte.fullname==null)[0];
    }

    let loadClk=async ()=>{

    }
    return (
                <WrapperHome>
                    <div className={"divcmd"}>
                        <button className={"btnadd"} onClick={loadLista}>Arata Organigrama</button>

                    </div>

                    <div id={"container"}>

                        {lista.length>0?
                            (<Level persoane={lista}/>)
                        :""
                        }





                    </div>
                </WrapperHome>



    )
}
export default Index;