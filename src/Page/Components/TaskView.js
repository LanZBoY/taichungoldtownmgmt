import React from "react";
import { Button, Container, Form, Modal, Image } from "react-bootstrap";
import TaskModel from '../model/Task.json'
import ContentsModel from '../model/contents.json'
import Mark from "./Mark";
import { firestore } from '../utils/firebase'
import { addDoc, collection } from 'firebase/firestore'

const TaskView = ({index, task, setTask, contents, setContents, setTasks, setLoadingModal, createMode, displayMode, setDisplayMode, showItem, setShowItem }) => {
    const TASK_TITLE = 'taskTitle';
    const TASK_DESC = 'taskDesc';
    const handleCloseItem = () => {
        if (createMode) {

            setTask(TaskModel);
            setContents([]);
        } else {
            setDisplayMode(true);
        }

        setShowItem(false);
    };

    const handleValueChange = (event) => {
        const target = event.target;
        setTask((prev) => {
            if (target.id === TASK_TITLE) {
                return {
                    ...prev,
                    taskTitle: target.value
                };
            } else if (target.id === TASK_DESC) {
                return {
                    ...prev,
                    taskDesc: target.value
                };
            }
            return prev;
        });
    }

    const handleAddContent = () => {
        setContents((prev) => {
            return [...prev, ContentsModel]
        })
    }


    const handdleDisplayMode = () => {
        setDisplayMode(false);
    }

    // const handdleDeleteTask = async () => {
    //     setLoadingModal(true);
    //     await deleteDoc(doc(firestore, 'tasks', task.id));
    //     await deleteDoc(task.contents);
    //     setLoadingModal(false);
    //     setShowItem(false);
    //     setTasks((prev) => {
    //         prev.splice(index, 1);
    //         return [...prev];
    //     })
    // }

    const submmitData = () => {
        if (createMode) {
            setShowItem(false);
            setLoadingModal(true);
            // 新增資料邏輯
            addDoc(collection(firestore, 'contents'), { contents: contents }).then((newContentsRef) => {
                task.contents = newContentsRef;
                addDoc(collection(firestore, 'tasks'), task).then((newTaskRef) => {
                    task.id = newTaskRef.id;
                    setTasks((prev) => {
                        return [task, ...prev];
                    });
                });
            });
            setLoadingModal(false);
            setTask(TaskModel);
            setContents([]);
        } else {
            setDisplayMode(true)
        }
        // console.log(task);
        // console.log(contents);
    }

    const renderMark = () => {
        let jsxElements = []
        for (let i = 0; i < contents.length; i++) {
            jsxElements = [...jsxElements, <Mark contents={contents} setContents={setContents} displayMode={displayMode} index={i} key={i} />]
        }
        return jsxElements;
    }

    const renderImg = () => {
        if (task.taskImgURL !== undefined) {
            return (<Image className="text-center" alt="圖片" src={task.taskImgURL} thumbnail></Image>);
        }
        return null;
    }

    return (
            <Modal show={showItem} onHide={handleCloseItem} size='lg' fullscreen={true}>
                <Modal.Header closeButton>任務內容</Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group className="formData">
                                <Form.Label className="inputField h3">標題</Form.Label>
                                <Form.Control id="taskTitle" type="text" value={task.taskTitle} placeholder="填入任務標題" onChange={handleValueChange} disabled={displayMode}></Form.Control>
                                <Form.Label className="inputField h3">描述</Form.Label>
                                <Form.Control id="taskDesc" as='textarea' rows={20} value={task.taskDesc} placeholder="填入任務描述" onChange={handleValueChange} disabled={displayMode}></Form.Control>
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
                    <Button variant="danger" hidden={!displayMode}>刪除</Button>
                    <Button variant="warning" hidden={!displayMode} onClick={handdleDisplayMode}>修改</Button>
                    <Button variant="success" onClick={handleAddContent} hidden={displayMode}>新增導覽地點</Button>
                    <Button variant="success" hidden={displayMode} onClick={submmitData}>確定</Button>
                </Modal.Footer>
            </Modal>
    )
};

export default TaskView;