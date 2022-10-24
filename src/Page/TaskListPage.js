import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import {firestore} from "./utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./utils/firebase"
import { collection, getDocs } from "firebase/firestore";
import CardElement from './Components/CardElement'
import TaskView from './Components/TaskView'
import { Card, Container} from "react-bootstrap";
import { Task } from "./model/Task";
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskListPage.css'


const TaskList = () =>{
    const [tasks, setTasks] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const handleShowItem = () => setShowItem(true);

    const [newTask, setNewTask] = useState(new Task());
    const [newContents, setNewContents] = useState([]);

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
                {tasks.map((taskData, index)=> {
                    return <CardElement taskData={taskData} key = {index} />
                })}
                <Card onClick={handleShowItem} bg='success' className="cardList text-center" text='white'>
                    <Card.Header>新增項目</Card.Header>
                </Card>
            </Container>
            {/* 新增控件 */}
            <TaskView task={newTask} setTask={setNewTask} contents={newContents} setContents = {setNewContents} showItem={showItem} setShowItem={setShowItem} disabled={false}/>
        </>
    )
};

export default TaskList;