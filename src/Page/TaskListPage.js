import React from "react";
import TopBar from './Components/TopBar'
// import firestore from "./utils/firebase";
import CardList from './Components/CardList'
import 'bootstrap/dist/css/bootstrap.min.css';


const tasklist = () =>{
    return(
        <div>
            <TopBar currentKey={'tasklist'}/>
            <CardList/>
        </div>
    )
};

export default tasklist;