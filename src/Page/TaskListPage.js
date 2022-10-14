import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import {firestore} from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import CardElement from './Components/CardList'
import CreateTask from './Components/CreateTask'
import { Card, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskListPage.css'
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./utils/firebase"


const TaskList = () =>{
    const [tasks, setTasks] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const handleShowItem = () => setShowItem(true);
    
    useEffect(()=>{
        getDocs(collection(firestore, 'tasks')).then((result) =>{
            result.docs.forEach(async (doc) =>{
                const data = doc.data()
                const url = await getDownloadURL(ref(storage, data.taskImg))
                data.taskImg = url;
                setTasks((prev) =>{
                    return [...prev, data]
                })
            })
        });
        
    },[])
    return(
        <>
            <TopBar currentKey={'tasklist'}/>
            <Container>
                {tasks.map((data, index)=> {
                    return <CardElement data={data} key = {index} />
                })}
                <Card onClick={handleShowItem} bg='success' className="cardList text-center" text='white'>
                    <Card.Header>新增項目</Card.Header>
                </Card>
            </Container>
            {/* 新增控件 */}
            <CreateTask showItem={showItem} setShowItem={setShowItem} disabled={false}/>
        </>
    )
};

export default TaskList;