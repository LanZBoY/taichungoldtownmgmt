import React, { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import {Task, Content} from "../model/Task";
import Mark from "./Mark";


const CreateTask = ({showItem, setShowItem}) =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';
    const [newTask, setNewTask] = useState(new Task());
    const [newContents, setNewContents] = useState([]);
    const handleCloseItem = () => {
        setNewTask(new Task());
        setNewContents([])
        setShowItem(false);
    };

    const handleValueChange = (event) => {
        const target = event.target;
        setNewTask((prev) => {
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

    const handleAddContent = () => {
        setNewContents((prev) =>{
            return [...prev, new Content()]
        })
    }

    const handleDelContent = () =>{
        setNewContents((prev) =>{
            prev.pop();
            return [...prev]
        })
    }

    const renderMark = () =>{
        return newContents.map((content, index) =>{
            return <Mark data={content} key={index}/>
        })
    }

    return(
        <Modal show={showItem} onHide={handleCloseItem} size = 'lg'>
            <Modal.Header closeButton>建立任務</Modal.Header>
            <Modal.Body>
                <Form className="text-center">
                    <Form.Group className="formData">
                        <Form.Label>任務標題</Form.Label>
                        <Form.Control id="taskTitle" type="text" value = {newTask.taskTitle} onChange = {handleValueChange}></Form.Control>
                        <Form.Label>任務描述</Form.Label>
                        <Form.Control id="taskDesc" as='textarea' rows={20} value = {newTask.taskDesc} onChange ={handleValueChange}></Form.Control>
                        <Form.Label>任務圖片</Form.Label>
                        <img alt="圖片預覽"></img>
                        <Form.Control id="taskFile" type="file" ></Form.Control>
                    </Form.Group>
                    
                    <Form.Group className="markData">
                        {renderMark()}
                        <ButtonGroup>
                            <Button variant="success" onClick={handleAddContent}>新增導覽任務</Button>
                            <Button variant="danger" onClick={handleDelContent}>刪除導覽任務</Button>
                        </ButtonGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" >確定</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default CreateTask;