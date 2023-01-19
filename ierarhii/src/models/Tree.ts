import Nod from "./Nod";
import Persoana from "./Persoana";


export default class Tree<T>{
    protected root:Nod<T>;
    constructor(root: Nod<T>) {
        this.root = root;
    }

    public get getRoot(){
        return this.root;
    }


    public find(nod:Nod<T>,data:T):Nod<T> | null {
        if (nod === null) {
            return null;
        }
        if (nod.data == data) {
            return nod;
        }
        // TreeNode<T> left=find(node.getLeft(),data);
        // if(left!=null){
        //     return left;
        // }
        //
        // return  find(node.getRight(),data);
        if(nod.left){
            let left:Nod<T>|null=this.find(nod.left,data);
            if(left){
                return left;
            }
        }

        if(nod.right){
            return this.find(nod.right,data);
        }

        return null;
    }

    public add(manager:T,subordonat:T):boolean{
       let  nodeManager=this.find(this.root,manager);
        if(nodeManager!=null){
            if(nodeManager.left==null){

                nodeManager.left= {

                    data:subordonat

                }
                return true;
            }else if(nodeManager.right==null){
              //  nodeManager.right=new Nod(null,null,subordonat);
                nodeManager.right={
                      data:subordonat
                }
                return true;
            }
            return false;
        }

        return false;

    }


    public traverse():void{
        //.clear();
        console.log("------------------La traversare----");
        let coada:Nod<T>[]=[];
        coada.push(this.root);
        console.log("ROOT");

        while (coada.length>0){
            let nL=coada[coada.length-1].left;
            let nR=coada[coada.length-1].right;

            if(nL!=null){
                coada.push(nL);
            }
            if(nR!=null){
                coada.push(nR);
            }
            console.log(coada[0]);
            coada.shift();

        }

    }

 // public getNextLevel(prevLevel:Nod<Persoana>[]):Nod<Persoana>[]{
 //        let level:Nod<Persoana>[]=[];
 //        prevLevel.map(p=>{
 //            let persL=p.left;
 //            let perR=p.right;
 //            level.push(persL);
 //            level.push(persR);
 //        });
 //        return level;
 //    }


}


