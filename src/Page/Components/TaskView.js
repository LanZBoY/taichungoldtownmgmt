import React from "react";
import { Button, Container, Form, Modal, Image } from "react-bootstrap";
import { Content, Task } from "../model/Task";
import Mark from "./Mark";
import { v4 as uuidv4 } from "uuid";

const TaskView = ({dataId, createMode, displayMode, setDisplayMode, task, setTask, contents, setContents, showItem, setShowItem}) =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';

    const handleCloseItem = () => {
        if(createMode === undefined){
            setDisplayMode(true);
        }else{
            setTask(new Task());
            setContents([]);
        }

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

    
    const handdleDisplayMode = () =>{
        setDisplayMode(false);
    }
    
    const handdleDeleteTask = () => {
        alert("確定要刪除資料？");
    }
    
    const conformData = () => {
        if (createMode){
            setShowItem(false);
            /*
            新增資料邏輯
            */
           setTask(new Task());
           setContents([]);
        }else{
            setDisplayMode(true)
        }
        console.log(task);
        console.log(contents);
    }
    
    const renderMark = () =>{
        let jsxElements = []
        for (let i = 0; i < contents.length; i++){
            jsxElements = [...jsxElements, <Mark contents={contents} setContents={setContents} displayMode={displayMode} index={i} key={uuidv4()}/>]
        }
        return jsxElements;
    }

    const renderImg = () =>{
        if (task.taskImgURL !== ""){
            return (<Image className="text-center" alt="圖片" src = {task.taskImgURL} thumbnail></Image>);
        }
        return null;
    }

    return(
        <Modal show={showItem} onHide={handleCloseItem} size = 'lg' fullscreen={true}>
            <Modal.Header closeButton>任務內容</Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group className="formData">
                            <Form.Label className="inputField h3">標題</Form.Label>
                            <Form.Control id="taskTitle" type="text" value = {task.taskTitle} onChange = {handleValueChange} disabled={displayMode}></Form.Control>
                            <Form.Label className="inputField h3">描述</Form.Label>
                            <Form.Control id="taskDesc" as='textarea' rows={20} value = {task.taskDesc} onChange ={handleValueChange} disabled={displayMode}></Form.Control>
                            {renderImg()}
                            <Form.Control id="taskFile" type="file" disabled={displayMode}></Form.Control>
                        </Form.Group>
                        <Form.Group className="markData inputField">
                            {renderMark()}
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" hidden={!displayMode} onClick ={handdleDeleteTask}>刪除</Button>
                <Button variant="warning" hidden={!displayMode} onClick = {handdleDisplayMode}>修改</Button>
                <Button variant="success" onClick={handleAddContent} hidden={displayMode}>新增導覽地點</Button>
                <Button variant="success" hidden={displayMode} onClick={conformData}>確定</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default TaskView;