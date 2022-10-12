import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import {firestore} from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import CardElement from './Components/CardList'
import TaskContent from './Components/TaskContent'
import { Card, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskListPage.css'


const TaskList = () =>{
    const [tasks, setTasks] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const handleShowItem = () => setShowItem(true)

    useEffect(()=>{
        getDocs(collection(firestore, 'tasks')).then((result) =>{
            result.docs.forEach((doc) =>{
                setTasks((prev) =>{
                    prev = [...prev, {id : doc.id, data: doc.data()}]
                    return prev
                })
            })
        });
    },[])

    return(
        <>
            <TopBar currentKey={'tasklist'}/>
            <Container>
                {tasks.map((doc)=> {
                    return <CardElement doc={doc} key={doc.id}/>
                })}
                <Card onClick={handleShowItem} bg='success' className="cardList text-center" text='white'>
                    <Card.Header>新增項目</Card.Header>
                </Card>
            </Container>
            {/* 新增控件 */}
            <TaskContent create={true} showItem={showItem} setShowItem={setShowItem} disabled={false}/>
        </>
    )
};

export default TaskList;