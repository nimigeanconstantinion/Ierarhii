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
import BinaryTree from "../../models/BinaryTree";



function Index(){



    const [lista,setLista]=useState(Object);
    const [levels,setLevels]=useState(Array<Array<any>>([[]]));
    const [swAdd,setSwAdd]=useState(0);
    const [swB,setSwB]=useState(0);

    const [organigrama,setOrganigrama]=useState(null);
    const [myTree,setMyTree]=useState(Object);
    const [sef,setSef]=useState(Object);
    const [fdel,setFDel]=useState(0);


    useAsyncEffect(async ()=>{

        if(lista instanceof Array<Persoana>&&lista.length>0){
            console.log("Din use effect")
            console.log(lista);
            let ob=structuredClone(lista);
            loadTree(ob);
           // setFDel(1);
        }
    },[lista]);


    useAsyncEffect(async ()=>{

        console.log("Asta i lista din BTREE")
        console.log(lista);
        if(lista instanceof Array<Persoana>&&lista.length>0){
            console.log(" cu asta merg la arbore Din use effect Btreeeeeeeee")
            console.log(lista);
            let obx=structuredClone(lista);
            loadBTreeAge(obx);
           // setFDel(2);
        }
    },[swB]);

    useEffect(()=>{
             console.log("Hellou");
             if (myTree instanceof Tree<Persoana>) {
                 console.log("uraaaa am incarcat arborele    ");
                 console.log("Lsta este:");
                 console.log(lista);

                 loadTreeLevels(myTree);

           }else if(myTree instanceof BinaryTree<Persoana>){
                 loadTreeLevels(myTree);
             }
    },[myTree])

    useEffect(()=>{
       console.log("_______In use effect perslev");
       console.log(levels);
    },[levels])


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


//         tree.traverse();
         setMyTree(tree);

     }

    }

    const comparatorByAge = (personA: Persoana, personB: Persoana) => {
            return personA.compareTo(personB);
    }

    let loadBTreeAge= async (persoane:Persoana[]):Promise<any> =>{
        console.log("**** din loadB         tree tabel=");
        console.log(persoane);
        if(persoane.length>0){
            let ob=structuredClone(lista);
            let indexRoot=-1;
            indexRoot=findRootIndex(ob);
            console.log("Index Root-ul din findRoot");
            console.log(indexRoot);
            console.log(persoane);
            let persRoot=null;
            if(indexRoot>=0){
                 let p=persoane[indexRoot];
                 let m:Manager={
                     idManager:p.parinte.idManager,
                     fullname:p.parinte.fullname,
                     position:p.parinte.position,
                     age:p.parinte.age,
                     salary:p.parinte.salary
                 }
                 persRoot=new Persoana(p.id,p.fullname,p.position,p.age,p.salary,m)
                console.log(persRoot);

            }
            let root:Nod<Persoana>={
                data:persRoot,
                left:null,
                right:null
            }
             let tree = new BinaryTree(root);
            if(persRoot!=null) {
                console.log(persoane.indexOf(persRoot));
            }
            persoane.splice(indexRoot,1);
            console.log("Tabelul devine");
            console.log(persoane);
             while (persoane.length!=0){
                 let newMan:Manager={
                     idManager:persoane[0].parinte.idManager,
                     fullname:persoane[0].parinte.fullname,
                     position:persoane[0].parinte.position,
                     age:persoane[0].parinte.age,
                     salary:persoane[0].parinte.salary

                 }
                 let newP=new Persoana(persoane[0].id,persoane[0].fullname,persoane[0].position,persoane[0].age,
                     persoane[0].salary,newMan);
                 // if(root.data!=null){
                      console.log("===================================");
                 //     console.log(persoane[0].compareTo(root.data));
                 //
                 // }
                 console.log(root.data?.compareTo(persoane[0]));
                 tree.insert(newP,root);
                 persoane.shift();
             }
// //
// //
            console.log("Am incarcat BTREEEEEEEE");

            console.log(tree);
//         tree.traverse();
            setMyTree(tree)


        }
// //         if(tabel.length>0){
// //             let persRoot=findRoot(tabel);
// //             console.log("Rootul este");
// //             console.log(persRoot);
// //             let root:Nod<Persoana>={
// //                 data:persRoot,
// //                 left:null,
// //                 right:null
// //             }
// //             let tree = new BinaryTree(root);
// //             tabel.splice(tabel.indexOf(persRoot),1);
// //             console.log("Tabelul devine");
// //             console.log(tabel);
// //             while (tabel.length!=0){
// //
// //                 tree.insert(tabel[0],root);
// //                 tabel.shift();
// //             }
// //
// //
// //             console.log("Am incarcat BTREEEEEEEE");
// //
// //             console.log(tree);
// // //         tree.traverse();
// //             setMyTree(tree);
//
//         }

    }


    let getNextLevel=(prevLevel:Nod<Persoana>[]|null|undefined):Nod<Persoana>[]|null=>{
       let nextLevel:Nod<Persoana>[]=[];
       let eM:Manager={
           idManager:0,
           fullname:"",
           position:"",
           age:0,
           salary:0
       };
       let eP:Persoana=new Persoana(0,"","",0,0,eM);


        let emptyNode:Nod<Persoana>={
            left:null,
            right:null,
            data:eP
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
    let loadTreeLevels=(tree:Tree<Persoana>|BinaryTree<Persoana>):Array<Nod<Persoana>[]>=>{
       let ret:Array<Nod<Persoana>[]>=[];

       let emptyM:Manager={
           idManager:0,
           fullname:null,
           position:null,
           age:0,
           salary:0
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
                           age:0,
                           salary:0,
                           parinte:emptyM,
                           compareTo(obj): number {
                               if(this.age>obj.age){
                                   return 1;
                               }else if(this.age<obj.age){
                                   return -1;
                               }
                               return 0;
                           }
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

    let findRootIndex=(listaPers:Persoana[]):number=>{
        let indx=listaPers.map((p,index)=>{
            if(p.parinte.idManager==0){
                return index;
            }
            return -1;
        }).filter(c=>c>=0)[0];
        return indx;
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
        if(fdel==1){
            let api=new Api();
            await api.delPerson(p);
            await loadLista();
        }
        if(fdel==2){
            console.log("la stergere binara");
           // let tmpTree=structuredClone(myTree);
            myTree.removeNod(lista[findRootIndex(lista)],p);
            console.log(myTree);
        }


    }

   let delBynaryNode=async (p:Persoana)=>{
        let tmpTree:BinaryTree<Persoana>=structuredClone(myTree);
        let tmpLista=structuredClone(lista);
        tmpTree.removeNod(tmpLista[findRootIndex(tmpLista)],p);
        setMyTree(tmpTree);
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
            personAge:newP.age,
            personSalary:newP.salary,
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

    let loadBClk=async ()=>{

       setSwB((prevState => prevState+1));
    }

    return (
                <WrapperHome>
                    <div className={"divcmd"}>
                        <button className={"btnadd"} onClick={loadClk}>Arata Organigrama</button>
                        <button className={"btnadd"} onClick={loadBClk}>Arata Arborele Varstelor</button>

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