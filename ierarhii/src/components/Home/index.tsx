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
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import ErrorRest from "../../models/ErrorRest";
import BinarySearchTree from "../../models/BinarySearchTree";
import {usePrevious} from "primereact/hooks";


function Index() {


    const [lista, setLista] = useState(Object);
    const [levels, setLevels] = useState(Array<Array<any>>([[]]));
    const [swAdd, setSwAdd] = useState(0);
    const [swB, setSwB] = useState(0);
    const [swCh, setSwCh] = useState(0);
    const [organigrama, setOrganigrama] = useState(null);
    const [myTree, setMyTree] = useState(Object);
    const [sef, setSef] = useState(Object);
    const [fdel, setFDel] = useState(0);
    const [bsTree, setBSTree] = useState(Object);
    const [comp, setComp] = useState(() => {
        return (a: Persoana, b: Persoana) => {
            return a.age - b.age;
        }
    });
    const [actClk,setActClk]=useState(0);

    useAsyncEffect(async () => {

        if (lista instanceof Array<Persoana> && lista.length > 0) {

            let obx: Array<Persoana> = new Array<Persoana>();

            if (lista.length > 0) {
                let u = await structuredClone(lista);


                await loadTree(u);

            }
            setFDel(1);
        }
    }, [lista]);


    useAsyncEffect(async () => {

        if (lista instanceof Array<Persoana> && lista.length > 0) {

            let obx = structuredClone(lista);
            setFDel(2);

        }
    }, [swB,swCh]);

    useEffect(() => {
        if (myTree instanceof Tree<Persoana>) {

            loadTreeLevels(myTree);

        } else if (myTree instanceof BinarySearchTree<Persoana>) {

            loadTreeLevels(myTree);
        }
    }, [myTree])


    useEffect(() => {
        console.log("Astea-s nivelurile");
        console.log(levels);
    }, [levels])


    useAsyncEffect(async ()=>{

    },[actClk]);

    let loadLista = async (): Promise<void> => {
        let api = new Api();
        try {
            let response = await api.getPersons();
            let x: Array<Persoana> | null | undefined = [];
            x = response.data;
            if (x != null && x != undefined && x.length > 0) {
                let p = x as Object;
                let p1: Persoana = x[0];
                setLista(x);
            } else {
                // //     throw new Error("Eroare de incarcare lista");
            }


        } catch (e) {
            throw new Error("ieooioeoi");
        }

    }


    let loadTree = async (tabel: Persoana[]): Promise<void> => {
        if (tabel && tabel.length > 0) {
            let persRoot = findRoot(tabel);
            let root: Nod<Persoana> = {
                data: persRoot,
                left: null,
                right: null
            }
            let tree = new Tree(root);

            let ct = 0;

            let superior: Persoana[] = [];
            superior.push(persRoot);
            tabel.splice(tabel.indexOf(persRoot), 1);

            while (tabel.length != 0 && superior.length != 0) {
                let tmpSup = superior[0];
                let childrenSup: Persoana[] = tabel.filter(p => p.parinte.idManager == tmpSup.id);

                childrenSup.map(p => {
                    tree.add(tmpSup, p);
                    superior.push(p);
                    tabel.splice(tabel.indexOf(p), 1);
                });
                superior.shift();
            }

            setMyTree(tree);
        }

    }


    let loadBSTreeGen = async ()=> {

        let persoane: Persoana[] = structuredClone(lista);


        if (persoane.length > 0) {


            let persRoot = null;

            let indexRoot: number = persoane.map((pers, index) => {
                if (pers.id == sef.id) return index;
                return -1;
            }).filter(n => n >= 0)[0];

            if (indexRoot >= 0) {
                let p = persoane[indexRoot];
                let m: Manager = {
                    idManager: p.parinte.idManager,
                    fullname: p.parinte.fullname,
                    position: p.parinte.position,
                    age: p.parinte.age,
                    salary: p.parinte.salary
                }
                persRoot = new Persoana(p.id, p.fullname, p.position, p.age, p.salary, m)

            }
            let rootS: Nod<Persoana> = {
                data: persRoot,
                left: null,
                right: null
            }

            let tree = new BinarySearchTree(rootS, comp);


            persoane.splice(indexRoot, 1);

            while (persoane.length != 0) {
                let newMan: Manager = {
                    idManager: persoane[0].parinte.idManager,
                    fullname: persoane[0].parinte.fullname,
                    position: persoane[0].parinte.position,
                    age: persoane[0].parinte.age,
                    salary: persoane[0].parinte.salary

                }
                let newP = new Persoana(persoane[0].id, persoane[0].fullname, persoane[0].position, persoane[0].age,
                    persoane[0].salary, newMan);
                tree.insert(newP, rootS);
                persoane.shift();
            }
            setMyTree(tree);
        }


    }

    let getNextLevel = (prevLevel: Nod<Persoana>[] | null): Nod<Persoana>[] | null => {
        if(prevLevel!=undefined&&prevLevel!=null&&prevLevel.length>0){
            let nextLevel: Nod<Persoana>[] = [];
            let eM: Manager = {
                idManager: 0,
                fullname: "",
                position: "",
                age: 0,
                salary: 0
            };
            let eP = new Persoana(0, "", "", 0, 0, eM);

            let emptyNode: Nod<Persoana> = {
                left: null,
                right: null,
                data: eP
            };


            if (prevLevel!=null && prevLevel.length > 0) {

                prevLevel.map(p=>{
                    let x:Nod<Persoana>=p as Nod<Persoana>;
                    if(x.left!=null){
                        nextLevel.push(x.left);
                    }else{
                        nextLevel.push(emptyNode);
                    }
                    if(x.right!=null){
                        nextLevel.push(x.right);
                    }else{
                        nextLevel.push(emptyNode);
                    }
                });

            }


            if (nextLevel.filter(n => {
                return n.data?.fullname != "";
            }).length > 0) {

                return nextLevel;

            }


            console.log("A venit undefined");
        }
        return null;
    }

    let loadTreeLevels = async (tree: Tree<Persoana> | BinarySearchTree<Persoana>): Promise<Array<Nod<Persoana>[]>> => {
        console.log("__^^^^^^asta e TREE din load TREE");
        console.log(tree);
        let ret: Array<Nod<Persoana>[]> = [];

        let emptyM: Manager = {
            idManager: 0,
            fullname: null,
            position: null,
            age: 0,
            salary: 0
        }
        let rslt = [];
        let levi = [];
        let pers = [];

        let root: Nod<Persoana> = tree.getRoot;


        let lev: Nod<Persoana>[] | null = [];
        let ud = [];
        if (root != null) {
            ud.push(root.data);
        }

        lev.push(root);
        rslt.push(ud);

        ret.push(lev);

        if (root != null) {
            levi.push(root.data);
            pers.push(levi);
        }
        let sw = true;

        while (sw) {
            if (lev != null && lev.length > 0) {
                let perslev: Persoana[] = [];
                let nextLev = getNextLevel(lev);
                let emptyPers: Persoana = new Persoana(0, "", "", 0, 0, emptyM);
                lev = nextLev;
                if (lev) {
                    ret.push(lev);
                    lev.map(n => {
                        if (n.data && n.data?.fullname != "") {
                            perslev.push(n.data);
                        } else {
                            let prs: Persoana | null = null;

                            perslev?.push(emptyPers);
                        }
                    })
                    rslt.push(perslev);
                }
            } else {
                sw = false;
            }

        }
        setLevels(rslt);
        return [];

    }

    let findRoot = (listaPers: Persoana[]): Persoana => {

        let myroot: Persoana = listaPers.filter(p => p.parinte.idManager == 0)[0];
        return myroot;
    }

    let findRootIndex = (listaPers: Persoana[]): number => {
        let indx = listaPers.map((p, index) => {
            if (p.parinte.idManager == 0) {
                return index;
            }
            return -1;
        }).filter(c => c >= 0)[0];
        return indx;
    }

    let loadClk = async () => {
        try {
            await loadLista();

        } catch (e) {
            console.log(e);
        }

    }


    let addToOrg = () => {


    }


    let addChild = (p: Persoana) => {

        setSwAdd(1);
        setSef(p);


    }

    let delChild = async (p: Persoana) => {

        if (fdel == 1) {
            let api = new Api();
            await api.delPerson(p);
            await loadLista();
        }
        if (fdel == 2) {
            let cloneTree: BinarySearchTree<Persoana> = myTree.clone();
            await rmNod(cloneTree,p);
            setMyTree(cloneTree);
           // await loadTreeLevels(myTree);
            //

        }

    }

    //STERGERE NOD
    let rmNod=async (tree:BinarySearchTree<Persoana>,p:Persoana)=>{
        let root=tree.getRoot;
        try {
            tree.removeNod(root, p);
        }catch(e) {

        }


    }

    // let delBynaryNode = async (p: Persoana) => {
    //     let tmpTree: BinaryTree<Persoana> = structuredClone(myTree);
    //     let tmpLista = structuredClone(lista);
    //     tmpTree.removeNod(tmpLista[findRootIndex(tmpLista)], p);
    //     setMyTree(tmpTree);
    // }


    let actionCh = async (newP: Persoana) => {

        newP.parinte = sef;
        let api = new Api();
        let newS = {
            personFullName: newP.fullname,
            personPosition: newP.position,
            personAge: newP.age,
            personSalary: newP.salary,
            idSef: sef.id
        }
        try {
            const response = await api.addPerson(newS);

            if (!response.status) {
                await loadLista();

            } else {
                let ems = (response as ErrorRest<Persoana>).message;
                throw new Error(ems);

            }


        } catch (e) {
            console.log("sunt in catch");
            console.log(e);
            // throw new Error("kjkwklsdlskdjlkjdljslfjlkdjflkdjflkj");

        }
        setSwAdd(0);
    }

    let loadBClk =async  () => {
        setComp(() => {
            return (a: Persoana, b: Persoana): number => {
                if (a.age < b.age) {
                    return -1;
                } else if (a.age > b.age) {
                    return 1;
                }
                return 0;
            };
        });
        console.log("______ DIN LoadBCLK ___sef=");
        setFDel(2);
        console.log(sef);
        await loadBSTreeGen();
        await loadTreeLevels(bsTree);

    }

    let loadBSalaryClk = async () => {
        await setComp(() => {
            return (a: Persoana, b: Persoana): number => {
                if (a.salary < b.salary) {
                    return -1;
                } else if (a.salary > b.salary) {
                    return 1;
                }
                return 0;
            };
        });
        setFDel(2);
        await loadBSTreeGen();
        await loadTreeLevels(bsTree);
        //  setSwB((prevState => prevState+1));

    }


    let selChild = async (p: Persoana) => {
        console.log("am primit raspuns");
        console.log(p);

        setSef(p);
        console.log("Noul ROOT setat=");
        console.log(sef);

    }


    return (
        <WrapperHome className={"divhome"}>
            <div className={"divcmd"}>
                <button className={"btnadd"} onClick={loadClk}>Arata Organigrama</button>
                <button className={"btnadd"} onClick={loadBClk}>Arata Arborele Varstelor</button>
                <button className={"btnadd"} onClick={loadBSalaryClk}>Arata Arborele Salariilor</button>

            </div>

            <div id={"container"}>

                {
                    levels.length > 0 && levels[0][0].fullname ?
                        (
                            <>
                                {
                                    levels.map(l => {
                                        return (<Level persoane={l} addChild={addChild} delChild={delChild}
                                                       selChild={selChild}/>)
                                    })
                                }
                            </>
                        )


                        : ""
                }

                {swAdd > 0 ?
                    <>
                        {/*<Child superior={persoana} action={addChild}/>*/}
                        <Child superior={sef} action={actionCh}/>
                    </>
                    : ""
                }


            </div>
        </WrapperHome>
    )
}

export default Index;