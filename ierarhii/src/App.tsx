import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/index";
import Persoana from "./models/Persoana";
import Manager from "./models/Manager";
import BinaryTree from "./models/BinaryTree";
import Nod from "./models/Nod";
import Integers from "./models/Integers";
import BinarySearchTree from "./models/BinarySearchTree";

function App() {
    let rt:Integers=new Integers(32);
    let root:Nod<Integers>={
        data:rt,
        left:null,
        right:null
    }
    let tree=new BinarySearchTree(root,(a:Integers,b:Integers):number=>{
       return a.data-b.data;
    });

    console.log(tree);
    console.log("====== dupa constructie ==========================");
    root=tree.getRoot;
    let nr:Integers=new Integers(23);
//     let rtt:Nod<Integers>=tree.getRoot;
      tree.insert(nr,root);
// //     //
      nr=new Integers(21);
      tree.insert(nr,root);
///
    nr=new Integers(56);
    tree.insert(nr,root);


     nr=new Integers(45);
     tree.insert(nr,root);
//
   // console.log(tree);
      nr=new Integers(42);
      tree.insert(nr,root);
//     //

      nr=new Integers(43);
      tree.insert(nr,root);
//      // int=new Integers(16);
//      // tree.insert(int,root);
//      // int=new Integers(17);
//      // tree.insert(int,root);
//      // int=new Integers(20);
//      // tree.insert(int,root);
// // //     //
// // //     //
       console.log("------------------Tree dupa incarcare---------------")
       console.log(tree);
       console.log("________________________");
// // //     console.log(tree.traverse());
// // // //     console.log(tree);
    console.log("==============Dupa stergere===============");
//       let rmv=new Integers(12);
       tree.removeNod(root,new Integers(45));
      console.log("+++++++++++++++++++++++");

      let nodd=tree.find(root,new Integers(56));
      console.log(nodd);
      //let nodx:Nod<Integers>|null=tree.succesor(nodd);
     // console.log(nodx);

    tree.removeNod(root,new Integers(56));

    console.log("+++++++++++++++++++++++");


//       tree.removeNod(root,new Integers(56));
//
//       console.log(tree.traverse());
// //
    //  console.log(tree);
      console.log(tree.traverse());



  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
        <Home/>

      </header>
    </div>
  );
}

export default App;
