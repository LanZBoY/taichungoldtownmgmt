import React from "react";
import TopBar from './Components/TopBar'
// import firestore from "./utils/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';


const tasklist = () =>{
    const list = [
        {
            title:"中文標籤"
        },
        {
            title:"第二個"
        },
        {
            title:"第三個"
        }
        ]
    return(
        <div>
            <TopBar currentKey={'tasklist'}/>
        </div>
    )
};

export default tasklist;