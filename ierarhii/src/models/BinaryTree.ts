import Nod from "./Nod";
import Comparable from "./Comparable";
import Comparator from "./Comparator";


export default class BinaryTree<T extends Comparable<T>>{
    private root:Nod<T>;
    constructor(root:Nod<T>) {
        this.root=root;
    }

    public getRoot():Nod<T>{
        return this.root;
    }



    public find(nod:Nod<T>,data:T):Nod<T> | null {
        if (nod === null) {
            return null;
        }
        if (nod.data == data) {
            return nod;
        }

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

   public findSuccesor(current:Nod<T>|null):Nod<T> | null | undefined{

       let start=current!.right;
       if(start){
           let exp=current!=null&&start.left!=null;
           if(exp){
               return start.left;
           }else{
               return start;
           }

       }

        return current;

   }

    public insert(data:T,nod:Nod<T>){



        if(nod.data!=null){
            if(nod.data.compareTo(data)>0){

                if(nod.left!=null){
                    this.insert(data,nod.left);
                }else{
                    let newNod={
                        data:data,
                        left:null,
                        right:null
                    };

                    nod.left=newNod;
                }
            }else if(nod.data.compareTo(data)<0){

                if(nod.right!=null){
                    this.insert(data,nod.right);
                }else{
                    let newNod={
                        data:data,
                        left:null,
                        right:null
                    };
                    nod.right=newNod;
                }
            }
        }
    }


    public traverse():void{
        //.clear();
        console.log("------------------La traversare----");
        let coada:Array<any>=[];
        coada.push(this.root);

        console.log("ROOT");

        while (coada.length>0){
            let nL=coada[0].left;
            let nR=coada[0].right;

            if(nL!=null){
                coada.push(nL);
               // console.log(nL.data);
            }
            if(nR!=null){
                coada.push(nR);
                //console.log(nR.data);
            }
            console.log(coada[0].data);
            coada.shift();
            console.log(coada);

        }

    }

    public removeNod(current:Nod<T>|null|undefined,dt:T):Nod<T>|null|undefined{
        if(current==null){
            return null;
        }else{
            if(current.data!.compareTo(dt)>0){
                    current.left=this.removeNod(current.left,dt);
            }else if(current.data!.compareTo(dt)<0){
                    current.right=this.removeNod(current.right,dt);
            }else{
                    //nu are copii
                if(current.left==null&&current.right==null){
                    current=null;
                }else if(current.left==null) {
                    let tmp:Nod<T>|null=current;
                    current=tmp.right;
                    tmp=null;
                }else if(current.right==null){
                    let tmp:Nod<T>|null=current;
                    current=tmp.left;
                    tmp=null;

                }else{
                    let tmp:Nod<T>|null|undefined=this.findSuccesor(current);
                    current.data=tmp!.data;
                    if(tmp!.data!=null){
                        current.right=this.removeNod(current.right,tmp!.data);

                    }
                    tmp=null;
                }


            }

        }
        return current;
    }


}