import React from "react";
import { Button, Container, Form, Modal, Image } from "react-bootstrap";
import Mark from "./Mark";
import { firestore } from '../utils/firebase'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { Content, Task } from "../../model/DataModel";
import { TASK } from "../../model/DataSchema";

const TaskView = ({index, task, setTask, contents, setContents, setTasks, setLoadingModal, createMode, displayMode, setDisplayMode, showItem, setShowItem }) => {
    const handleCloseItem = () => {
        if (createMode) {
            setTask(new Task());
            setContents([new Content()]);
        } else {
            setDisplayMode(true);
        }

        setShowItem(false);
    };

    const handleValueChange = (event) => {
        setTask((prev) => {
            const target = event.target;
            if (target.id === TASK.TASK_TITLE) {
                return new Task({...prev, taskTitle: target.value, id : prev.id, taskImgURL : prev.taskImgURL , taskImgBlob : prev.taskImgBlob});
            } else if (target.id === TASK.TASL_DESC) {
                return new Task({...prev, taskDesc: target.value, id : prev.id, taskImgURL : prev.taskImgURL , taskImgBlob : prev.taskImgBlob});
            } else if (target.id === TASK.TASK_FILE){
                const file = target.files[0];
                const previewURL = URL.createObjectURL(file);
                return new Task({...prev, taskImg: file.name, taskImgURL : previewURL , taskImgBlob : file})
            }
            return prev;
        });
    }

    const handleAddContent = () => {
        setContents((prev) => {
            return [...prev, new Content()];
        })
    }


    const handdleDisplayMode = () => {
        setDisplayMode(false);
    }

    const handdleDeleteTask = async () => {
        if(window.confirm("確定要刪除嗎？") === true){
            setLoadingModal(true);
            await deleteDoc(doc(firestore, 'tasks', task.id));
            await deleteDoc(task.contents);
            setLoadingModal(false);
            setShowItem(false);
            setTasks((prev) => {
                prev.splice(index, 1);
                return [...prev];
            })
        }
    }

    const submmitData = () => {
        if (createMode) {
            const uploadTask = {...task};
            const uploadContents = contents.map((data) => {
                return {...data};
            })
            setShowItem(false);
            setLoadingModal(true);
            // 新增資料邏輯
            addDoc(collection(firestore, 'contents'), { contents: uploadContents }).then((newContentsRef) => {
                uploadTask.contents = newContentsRef;
                addDoc(collection(firestore, 'tasks'), uploadTask).then((newTaskRef) => {
                    uploadTask.id = newTaskRef.id;
                    setTasks((prev) => {
                        return [uploadTask, ...prev];
                    });
                    setLoadingModal(false);
                    setTask(new Task());
                    setContents([new Content()]);
                });
            });
            // TODO: 新增照片邏輯
            
        } else {
            setDisplayMode(true)
        }
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
                                <Form.Control id="taskFile" type="file" disabled={displayMode} onChange={handleValueChange}></Form.Control>
                            </Form.Group>
                            <Form.Group className="markData inputField">
                                {renderMark()}
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handdleDeleteTask} hidden={!displayMode}>刪除</Button>
                    <Button variant="warning" hidden={!displayMode} onClick={handdleDisplayMode}>修改</Button>
                    <Button variant="success" onClick={handleAddContent} hidden={displayMode}>新增導覽地點</Button>
                    <Button variant="success" hidden={displayMode} onClick={submmitData}>確定</Button>
                </Modal.Footer>
            </Modal>
    )
};

export default TaskView;