import Nod from "./Nod";


export default class Tree<T>{
    protected root:Nod<T>;
    constructor(root: Nod<T>) {
        this.root = root;
    }


    public find(nod:Nod<T>,data:T):Nod<T> | null {
        if (nod === null) {
            return null;
        }
        if (nod.data == data) {
            return nod;

        }

        let left,right;
        if(nod.left){
            left= this.find(nod.left,data);
            return left;
        }else{
            if(nod.right){
                right=this.find(nod.right,data);
                return right;
            }
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
        let coada:Nod<T>[]=[];
        coada.push(this.root);
        while (true){
            let nL:Nod<T>|undefined=coada[coada.length].left;
            let nR:Nod<T>|undefined=coada[coada.length].left;

            if(nL!=null){
                coada.push(nL);
            }
            if(nR!=null){
                coada.push(nR);
            }
            console.log(coada[0].data);
            coada.shift();

        }

    }



}


