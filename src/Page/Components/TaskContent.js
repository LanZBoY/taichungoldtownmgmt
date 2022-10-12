import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";


const TaskContent = ({create=false, showItem, setShowItem, doc, disabled}) =>{
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

    const showData = () => {
        if(doc !== undefined){
            setNewData(doc.data);
        }
    }

    const header = () => {
        if (create === true){
            return <Modal.Header closeButton>建立資料</Modal.Header>
        }
        return <Modal.Header closeButton>詳細資料</Modal.Header>
    }

    return(
        <Modal show={showItem} onShow={showData} onHide={handleCloseItem} size = 'lg'>
            {header()}
            <Modal.Body>
                <Form className="text-center">
                    <Form.Group className="formData">
                        <Form.Label>任務標題</Form.Label>
                        <Form.Control id="taskTitle" disabled = {!create} type="text" value = {newData.taskTitle} onChange = {handleValueChange}></Form.Control>
                        <Form.Label>任務描述</Form.Label>
                        <Form.Control id="taskDesc" as='textarea' disabled = {!create} rows={20} value = {newData.taskDesc} onChange ={handleValueChange}></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default TaskContent;