import React from "react";
import { Button, Container, Form, Modal, Image } from "react-bootstrap";
import Mark from "./Mark";
import { firestore, storage } from '../utils/firebase'
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util";
import { Content, Task } from "../../model/DataModel";
import { TASK, MARK } from "../../model/DataSchema";
import { uploadBytes } from "firebase/storage";

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

            if (task.taskImg !== ""){
                await deleteObject(ref(storage, task.taskImg));
            }

            await deleteDoc(task.contents);

            for (const content of contents){
                if(content.markImg !== ""){
                    await deleteObject(ref(storage, content.markImg));
                }
            }
            setLoadingModal(false);
            setShowItem(false);
            setTasks((prev) => {
                prev.splice(index, 1);
                return [...prev];
            })
        }
    }

    const submmitData = async () => {
        if (createMode) {
            setShowItem(false);
            setLoadingModal(true);
            // 新增資料邏輯
            const newContentsRef = doc(firestore, 'contents', uuidv4());
            const newTaskRef = doc(firestore, 'tasks', uuidv4());
            task.id = newTaskRef.id;
            task.contents = newContentsRef;
            // task跟content的相片邏輯
            if(task.taskImg !== ""){
                task.taskImg = TASK.COLLECTION.STORAGE + '/' + newTaskRef.id + '/' + task.taskImg;
            }
            contents = contents.map((content) =>{
                if (content.markImg !== ""){
                    content.markImg = MARK.COLLECTION.STORAGE + '/' + newContentsRef.id + '/' + content.markImg;
                }
                return content;
            });
            await setDoc(newContentsRef, {contents : contents.map((content) => {
                return {...content};
            })});
            await setDoc(newTaskRef, {...task});
            // 上傳照片邏輯
            const taskImgRef = ref(storage, task.taskImg);
            await uploadBytes(taskImgRef, task.taskImgBlob)           
            for (const content of contents){
                if(content.markImg !== ""){
                    const contentImgRef = ref(storage, content.markImg);
                    await uploadBytes(contentImgRef, content.markImgBlob);
                }
            }

            const docSnap = await getDoc(newTaskRef)
            if (docSnap.exists()){
                task = new Task({...docSnap.data()});
                task.id = docSnap.id;
                if(task.taskImg !== ""){
                    task.taskImgURL = await getDownloadURL(ref(storage, task.taskImg));
                }
                setTasks((prev) => {
                    return [task, ...prev];
                });
            }
            setTask(new Task());
            setContents([new Content()]);
            setLoadingModal(false);
        } else {
            
            setDisplayMode(true);
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