import React, { Fragment, useState } from "react";
import { Card } from "react-bootstrap"
import TaskView from "./TaskView";
import {  storage } from "../utils/firebase";
import { getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
const CardElement = ({index, taskData, setTasks, setLoadingModal }) => {
    const [showItem, setShowItem] = useState(false);
    const [displayMode, setDisplayMode] = useState(true)
    const [task, setTask] = useState(taskData);
    const [contents, setContents] = useState([]);
    const renderImg = () => {
        if (task.taskImgURL !== undefined) {
            return (<Card.Img className="fixImg" src={task.taskImgURL} />);
        }
        return null;
    }

    const loadData = async () => {
        setLoadingModal(true);
        if(task.contents !== null){
            const doc = await getDoc(task.contents);
            let docData = doc.data().contents;
            for (let i = 0; i < docData.length; i++) {
                if (docData[i].markImg !== ""){
                    const url = await getDownloadURL(ref(storage, docData[i].markImg));
                    docData[i].markImgURL = url;
                }
            }
            setContents(docData);
        }
        setShowItem(true);
        setLoadingModal(false);
    }

    return (
        <Fragment>
            <Card className="text-center" border="secondary" onClick={loadData}>
                <Card.Header>{task.taskTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>{task.taskDesc}</Card.Text>
                    {renderImg()}
                </Card.Body>
            </Card>
            <TaskView index={index} task={task} setTask={setTask} setTasks={setTasks} contents={contents} setContents={setContents} displayMode={displayMode} setDisplayMode={setDisplayMode} showItem={showItem} setShowItem={setShowItem} setLoadingModal={setLoadingModal} />
        </Fragment>
    )
};

export default CardElement;