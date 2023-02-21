import Nod from "./Nod";
import Comparable from "./Comparable";
import Comparator from "./Comparator";
import {Result} from "neverthrow";
import combineWithAllErrors = Result.combineWithAllErrors;


export default class BinarySearchTree<T>{
    private root:Nod<T>;
    comparator: (a: T, b: T) => number;


    constructor(root:Nod<T>,comparator: (a: T, b: T) => number) {
        this.comparator = comparator;
        this.root=root;
    }

    public clone():BinarySearchTree<T>{

        let newRoot:Nod<T>={
            data:this.root.data,
            left:this.root.left,
            right:this.root.right
        }
        return new BinarySearchTree<T>(newRoot,this.comparator);

}

    public get getRoot():Nod<T>{
        return this.root;
    }


    public get getComp():Function{
        return this.comparator;
    }

    public insert(dt:T,nod:Nod<T>){

        if(nod.data!=null){
            if(this.comparator(dt,nod.data)<0){

                if(nod.left!=null){
                    this.insert(dt,nod.left);
                }else{
                    let newN:Nod<T>={
                        data:dt,
                        left:null,
                        right:null
                    }
                   nod.left=newN;
                }
            }else if(this.comparator(dt,nod.data)>0){

                if(nod.right!=null){
                    this.insert(dt,nod.right);
                }else{
                    let newN:Nod<T>={
                        data:dt,
                        left:null,
                        right:null
                    }
                    nod.right=newN;
                }
            }
        }
    }


    public find(nod:Nod<T>,data:T):Nod<T> | null {
       if(nod!=null&&nod.data!=null) {
           if (this.comparator(nod.data, data) == 0) {
               return nod;
           } else if (nod.left != null) {
               let left:Nod<T>|null=this.find(nod.left,data);
               if(left?.data!=null&&this.comparator(left?.data,data)==0){
                   return left;
               }

           }

               if(nod.right!=null)  return this.find(nod.right,data);

       }
       return null;







    }

    public succesor(start:Nod<T>|null):Nod<T>|null{

        if (start == null) return null;
        let current= start.right as Nod<T>;
        if(current.left?.data!=null){
            while (current?.left?.data != null) current = current.left;

        }
        return current;


    }


    public findSuccesor(current:Nod<T>|null,index:number):Nod<T> | null {


        if(current==null){
            return null;
        }

        let start:Nod<T>|null=null;
        if(index==0) {
            if (current.right != null) {
                start = current.right as Nod<T>;
                index++;
                if (start.left?.data != null) {
                   start= this.findSuccesor(start.left,index) as Nod<T>;
                }
                return start;

            }
            return current;

        }else{
            if(current.left?.data!=null){
                start=current.left;
                index++;
                return this.findSuccesor(start,index);
            }
            return current;
        }
    }


    public removeNod(current:Nod<T>|null,dt:T):Nod<T>|null{

        if(current==null){
            return null;
        }else{
            if(current.data!=null&&this.comparator(current.data,dt)>0){
                if(current.left!=null){
                    current.left=this.removeNod(current.left,dt);

                }
            }else if(current.data!=null&&this.comparator(current!.data,dt)<0){
                if(current.right!=null){
                     current.right=this.removeNod(current.right,dt);
                 }
            }else{
                //nu are copii

                if(current.left==null&&current.right==null){
                    current.data=null;
                }else if(current.left==null) {
                    let tmp:Nod<T>|null=current;

                    if(tmp?.right!=null) current=tmp.right;

                    tmp=null;
                }else if(current.right?.data==null){

                    let tmp:Nod<T>|null=current;
                    if (tmp.left!=null) current=tmp.left;
                    tmp=null;

                }else{
                    //let tmp:Nod<T>|null=this.findSuccesor(current);
                     let tmp:Nod<T>|null=this.findSuccesor(current,0);
                    // let tmp:Nod<T>|null=this.succesor(current);
                    current.data=tmp!.data;

                    if(tmp!.data!=null&&current.right!=null){
                        current.right=this.removeNod(current!.right,tmp!.data);

                    }
                    tmp=null;
                }


            }
            return current;
        }
    }

    public getAllNodesByLevel(index:number):Nod<T>[][]|null{
        let allLev:Nod<T>[][]=[[]];
        let level:Nod<T>[]=[];
        let tmpLev:Nod<T>[]=[];
        let emptyNode:Nod<T>={
            data:null,
            left:null,
            right:null
        }
        allLev.shift();
        console.log("ounf=gime alllev="+allLev.length);
        tmpLev.push(this.root);
        let sw:boolean=true;
        while(tmpLev.filter(n=>n!=emptyNode).length>0){
            allLev.push(tmpLev);
                    tmpLev.map(n=>{
                        if(n.left!=null){
                             level.push(n.left);
                        }else{
                            level.push(emptyNode)
                        }
                        if(n.right!=null){
                             level.push(n.right);
                        }else{
                            level.push(emptyNode);
                        }
                    });

                    tmpLev=level;
                    level=[];
        }

        return allLev;
    }

    public traverse():void{
        let vector:Nod<T>[]=[];

        let coada:Array<any>=[];
        coada.push(this.root);

        console.log("ROOT");
        vector.push(this.root);
        while (coada.length>0){
            let nL=coada[0].left;
            let nR=coada[0].right;

            if(nL!=null){
                coada.push(nL);
                vector.push(nL)
            }
            if(nR!=null){
                coada.push(nR);
                vector.push(nR);
            }
            console.log(coada[0].data);
            coada.shift();

        }

        console.log(this.getAllNodesByLevel(4));
    }


}