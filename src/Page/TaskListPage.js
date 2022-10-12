import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import firestore from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import CardList from './Components/CardList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Form, Modal } from "react-bootstrap";
import './TaskListPage.css'


const TaskList = () =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';
    const [tasks, setTasks] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const [newData, setNewData] = useState(
        {
            taskTitle : "",
            taskDesc : "",
            taskImg : ""
        }
    );
    const handleShowItem = () => setShowItem(true)
    const handleCloseItme = () => {
        setNewData((prev) =>{
            return {
                taskTitle : "",
                taskDesc : "",
                taskImg : ""
            };
        });
        setShowItem(false);
    }
    const handleValueChange = (event) => {
        const target = event.target;
        setNewData((prev) => {
            if (target.id === TASK_TITLE){
                return {
                    ...prev,
                    taskTitle: target.value
                };
            }else if(target.id === TASK_DESC){
                return {
                    ...prev,
                    taskDesc: target.value
                };
            }
            return prev;
        });
    }
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
                    return <CardList doc={doc} key={doc.id}/>
                })}
                <Card onClick={handleShowItem} bg='success' className="text-center" text='white'>
                    <Card.Header>新增項目</Card.Header>
                </Card>
            </Container>
            {/* 新增控件 */}
            <Modal show={showItem} onHide={handleCloseItme} size = 'lg'>
                <Modal.Header closeButton>建立項目</Modal.Header>
                <Modal.Body>
                    <Form className="text-center">
                        <Form.Group>
                            <Form.Label>任務標題</Form.Label>
                            <Form.Control id="taskTitle" type="text" value = {newData.taskTitle} onChange = {handleValueChange}></Form.Control>
                            <Form.Label>任務描述</Form.Label>
                            <Form.Control id="taskDesc" as='textarea' rows={3} value = {newData.taskDesc} onChange ={handleValueChange}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default TaskList;