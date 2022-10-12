import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";


const TaskContent = ({header="", showItem, setShowItem, doc}) =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';
    const [newData, setNewData] = useState(
        {
            taskTitle : "",
            taskDesc : "",
            taskImg : ""
        }
    );

    const handleCloseItem = () => {
        setNewData(
            {
                taskTitle : "",
                taskDesc : "",
                taskImg : ""
            }
        )
        setShowItem(false);
    };

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
        if(doc !== undefined){
            setNewData(doc.data);
        }
    },[doc])

    return(
        <Modal show={showItem} onHide={handleCloseItem} size = 'lg'>
            <Modal.Header closeButton>{header}</Modal.Header>
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
    )
};

export default TaskContent;