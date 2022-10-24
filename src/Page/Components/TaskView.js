import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Content } from "../model/Task";
import Mark from "./Mark";


const TaskView = ({task, setTask, contents, setContents, showItem, setShowItem}) =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';

    const handleCloseItem = () => {
        setTask(task);
        setContents(contents)
        setShowItem(false);
    };

    const handleValueChange = (event) => {
        const target = event.target;
        setTask((prev) => {
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
        setContents((prev) =>{
            return [...prev, new Content()]
        })
    }

    const renderMark = () =>{
        let jsxElements = []
        for (let i = 0; i < contents.length; i++){
            jsxElements = [...jsxElements, <Mark contents={contents} setContents={setContents} index={i} key={i}/>]
        }
        return jsxElements;
    }

    const conformData = () => {
        console.log(task);
        console.log(contents);
    }

    return(
        <Modal show={showItem} onHide={handleCloseItem} size = 'lg'>
            <Modal.Header closeButton>任務內容</Modal.Header>
            <Modal.Body>
                <Form className="text-center">
                    <Form.Group className="formData">
                        <Form.Label>任務標題</Form.Label>
                        <Form.Control id="taskTitle" type="text" value = {task.taskTitle} onChange = {handleValueChange}></Form.Control>
                        <Form.Label>任務描述</Form.Label>
                        <Form.Control id="taskDesc" as='textarea' rows={20} value = {task.taskDesc} onChange ={handleValueChange}></Form.Control>
                        <Form.Label>任務圖片</Form.Label>
                        <img hidden alt="預覽圖片"></img>
                        <Form.Control id="taskFile" type="file" ></Form.Control>
                    </Form.Group>
                    <Form.Group className="markData inputField">
                        {renderMark()}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleAddContent}>新增導覽地點</Button>
                <Button variant="success" onClick={conformData}>確定</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default TaskView;