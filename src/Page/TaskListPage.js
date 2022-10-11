import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import firestore from "./utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import CardList from './Components/CardList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Form, Modal } from "react-bootstrap";


const TaskList = () =>{
    const [tasks, setTasks] = useState([])
    const [showItem, setShowItem] = useState(false)
    
    const handleShowItem = () => setShowItem(true)
    const handleCloseItme = () => setShowItem(false)

    // useEffect(()=>{
    //     getDocs(collection(firestore, 'tasks')).then((result) =>{
    //         result.docs.forEach((doc) =>{
    //             setTasks((prev) =>{
    //                 prev = [...prev, {id : doc.id, data: doc.data()}]
    //                 return prev
    //             })
    //         })
    //     });
    // },[])
    return(
        <>
            <TopBar currentKey={'tasklist'}/>
            <Container>
                {tasks.map((doc)=> {
                    return <CardList data={doc.data} key={doc.id}/>
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
                            <Form.Control type="text" size="lg"></Form.Control>
                            <Form.Label>任務描述</Form.Label>
                            <Form.Control as='textarea' rows={3}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default TaskList;