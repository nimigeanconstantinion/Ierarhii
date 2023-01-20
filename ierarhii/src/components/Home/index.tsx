import Card from "../Card/Card";
import Persoana from "../../models/Persoana";
import {WrapperHome} from "./HomeStyle";
import Api from "../../Api";
import {constants} from "os";
import ResponseImpl from "../../models/ResponseImpl";
import Level from "../Level/Level";
import {useEffect, useState} from "react";
import Tree from "../../models/Tree";
import Nod from "../../models/Nod";
import Manager from "../../models/Manager";
import {tab} from "@testing-library/user-event/dist/tab";
import useAsyncEffect from "use-async-effect";
import Child from "../Child/Child";
import {forEach} from "react-bootstrap/ElementChildren";



function Index(){



    const [lista,setLista]=useState(Object);
    const [levels,setLevels]=useState(Array<Array<any>>([[]]));
  //  const [levPers,setLevelPers]=useState(Object);
    const [swAdd,setSwAdd]=useState(0);
    const [organigrama,setOrganigrama]=useState(null);
    const [myTree,setMyTree]=useState(Object);
    const [sef,setSef]=useState(Object);

    // useEffect(() => {
    //     let org=lista;
    //
    //         (async () => {
    //             console.log("Lista din use efect este ");
    //             console.log(lista);
    //             await loadTree(lista);
    //         })();
    //
    //
    //
    //
    // }, [lista]);

    useAsyncEffect(async ()=>{

        if(lista instanceof Array<Persoana>&&lista.length>0){
            console.log("Din use effect")
            console.log(lista);
            let ob=structuredClone(lista);
            loadTree(ob);

        }
    },[lista]);

    useEffect(()=>{
             console.log("Hellou");
             if (myTree instanceof Tree) {
                 console.log("uraaaa am incarcat arborele    ");
                 console.log("Lsta este:");
                 console.log(lista);

                 loadTreeLevels(myTree);
        //
           }
    },[myTree])

    useEffect(()=>{
       console.log("_______In use effect perslev");
       console.log(levels);
    },[levels])


    // useEffect(() => {
    //     if (myTree instanceof Tree) {
    //         console.log("uraaaa");
    //         loadTreeLevels(myTree);
    //
    //     }
    //
    // }, [myTree]);

    // useEffect(()=>{
    //     console.log("Am nivelele");
    //     console.log(persLev);
    // },[persLev])

   let loadLista= async ():Promise<void> => {
        let api=new Api();
        try {
            let response = await api.getPersons();

            if(response.data) {
                console.log("Incarc lista");
                let lst=response.data;
                console.log(lst);
                setLista(lst);

            }else{
                throw new Error("Eroare de incarcare lista");
            }


        } catch (e) {
            console.log(e);
            throw new Error("ieooioeoi");
        }
        // return Promise.reject("error");

    }


    let loadTree= async (tabel:Persoana[]):Promise<any> =>{
        console.log("din loadtree tabel=");
        console.log(tabel);
     if(tabel.length>0){
         let persRoot=findRoot(tabel);
         let root:Nod<Persoana>={
             data:persRoot,
             left:null,
             right:null
         }
         let tree = new Tree(root);

         let ct=0;

         let superior:Persoana[]=[];
         superior.push(persRoot);
         tabel.splice(tabel.indexOf(persRoot),1);

         while (tabel.length!=0&&superior.length!=0){
             let tmpSup=superior[0];
             let childrenSup:Persoana[]=tabel.filter(p=>p.parinte.idManager==tmpSup.id);

             childrenSup.map(p=>{
                 tree.add(tmpSup,p);
                 superior.push(p);
                 tabel.splice(tabel.indexOf(p),1);
             });
             superior.shift();
         }



         console.log("am incarcat Arborele");
         console.log(tree);

//         tree.traverse();
         setMyTree(tree);

     }

    }

    let getNextLevel=(prevLevel:Nod<Persoana>[]|null|undefined):Nod<Persoana>[]|null=>{
       let nextLevel:Nod<Persoana>[]=[];
        let emptyNode:Nod<Persoana>={
            left:null,
            right:null,
            data:null
        };
       console.log("get next level pentru____________");
        console.log(prevLevel);

        // if(prevLevel!=null&&prevLevel!=undefined){
        //     prevLevel.map(p=>{
        //
        //         if (p.left!=null) {
        //             nextLevel.push(p.left);
        //         } else {
        //             nextLevel.push(emptyNode);
        //         }
        //
        //         if (p.right!=null) {
        //             nextLevel.push(p.right);
        //         } else {
        //             nextLevel.push(emptyNode);
        //         }
        //
        //     })
        //
        // }
        if(prevLevel){
            prevLevel.forEach(function (p) {

                        if (p.left!=null) {
                            nextLevel.push(p.left);
                        } else {
                            nextLevel.push(emptyNode);
                        }

                        if (p.right!=null) {
                            nextLevel.push(p.right);
                        } else {
                            nextLevel.push(emptyNode);
                        }

            });
        }



        if(nextLevel.filter(n=>n.data!=null).length>0) return nextLevel;
        return null;
    }
    //
    //
    let loadTreeLevels=(tree:Tree<Persoana>):Array<Nod<Persoana>[]>=>{
       let ret:Array<Nod<Persoana>[]>=[];

       let emptyM:Manager={
           idManager:null,
           fullname:null,
           position:null
       }
       let rslt:Array<Persoana[]>=[];
       let levi:Persoana[]|null=[];
       let pers:Array<Persoana[]>=[];

        let root=tree.getRoot;
        let lev:Nod<Persoana>[]|null=[];
        let ud:Persoana[]|null=[];
        if(root.data){
            ud.push(root.data);
        }
        lev.push(root);
        rslt.push(ud);
       ret.push(lev);
       if(root.data){
           levi.push(root.data);
           pers.push(levi);

       }


       let sw=true;
       while(sw){
           if(lev){
                       let perslev:Persoana[]=[];
                       let nextLev=getNextLevel(lev);
                       let emptyPers:Persoana={
                           id:0,
                           fullname:"",
                           position:"",
                           parinte:emptyM
                       }
                           lev=nextLev;
                       if(lev){
                           ret.push(lev);
                           lev.map(n=>{
                               if(n.data){
                                  perslev.push(n.data);
                               }else{
                                   let prs:Persoana|null=null;

                                   perslev?.push(emptyPers);
                               }
                           })
                           rslt.push(perslev);
                       }
           }else{
               sw=false;
           }

       }


       setLevels(rslt);
       return ret;
    }
    //
    //

    let findRoot=(listaPers:Persoana[]):Persoana=>{

       let myroot=listaPers.filter(p=>p.parinte.fullname==null)[0];
       return myroot;
    }

    let loadClk=async ()=>{
       try {
           await loadLista();
           console.log("Am incarcat lista");
         //  loadTreeLevels(myTree);

       }catch (e){
           console.log(e);
       }
       // console.log(findRoot(organigrama));

    }


    let addToOrg=()=>{


    }


    let addChild=(p:Persoana)=>{
        console.log("Am capturat in home persoana");
        console.log(p)
        setSwAdd(1);
        setSef(p);


    }

    let delChild=async (p:Persoana)=>{
        console.log("Am capturat in home persoana");
        console.log(p)
        let api=new Api();
        await api.delPerson(p);
        await loadLista();

    }


    let actionCh=async (newP:Persoana)=>{
        console.log("Am apasat adauga in child");
        console.log("seful este");
        console.log(sef);

        newP.parinte=sef;
        let api=new Api();
        let newS={
            personFullName:newP.fullname,
            personPosition:newP.position,
            idSef:sef.id
        }
        console.log(newS);
        try{
            let response=await api.addPerson(newS);
            await loadLista();
            //console.log(response.messageerror);

        }catch (e) {
            throw new Error("Eroare noua");
        }
        setSwAdd(0);
    }



    return (
                <WrapperHome>
                    <div className={"divcmd"}>
                        <button className={"btnadd"} onClick={loadClk}>Arata Organigrama</button>

                    </div>

                    <div id={"container"}>

                        {
                          levels.length>0&&levels[0][0].fullname?
                              (
                                  <>
                                      {
                                          levels.map(l=>{
                                             return( <Level persoane={l} addChild={addChild} delChild={delChild} />)
                                          })
                                      }
                                  </>
                              )



                            :""
                        }

                        {swAdd>0?
                                <>
                                   {/*<Child superior={persoana} action={addChild}/>*/}
                                    <Child superior={sef} action={actionCh}/>
                                </>
                            :""
                        }


                    </div>
                </WrapperHome>



    )
}
export default Index;