import React from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Content } from "../model/Task";
import Mark from "./Mark";
import { v4 as uuidv4 } from "uuid";

const TaskView = ({dataId, createMode, displayMode, setDisplayMode, task, setTask, contents, setContents, showItem, setShowItem}) =>{
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';

    const handleCloseItem = () => {
        if(createMode === undefined){
            setDisplayMode(true);
        }
        setTask(task);
        setContents(contents);
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
            jsxElements = [...jsxElements, <Mark contents={contents} setContents={setContents} displayMode={displayMode} index={i} key={uuidv4()}/>]
        }
        return jsxElements;
    }

    const haddleDisplayMode = () =>{
        setDisplayMode(false);
    }

    const conformData = () => {
        console.log(task);
        console.log(contents);
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
                            <Form.Label className="inputField h3">圖片</Form.Label>
                            <img hidden alt="預覽圖片"></img>
                            <Form.Control id="taskFile" type="file" disabled={displayMode}></Form.Control>
                        </Form.Group>
                        <Form.Group className="markData inputField">
                            {renderMark()}
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" hidden={!displayMode} onClick = {haddleDisplayMode}>修改</Button>
                <Button variant="danger" hidden={!displayMode}>刪除</Button>
                <Button variant="success" onClick={handleAddContent} hidden={displayMode}>新增導覽地點</Button>
                <Button variant="success" onClick={conformData}>確定</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default TaskView;