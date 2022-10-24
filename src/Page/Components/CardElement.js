import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { getDoc } from "firebase/firestore";
import TaskView from "./TaskView";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
const CardElement = ({taskData}) => {
    const [task, setTask] = useState(taskData);
    const [showItem, setShowItem] = useState(false);
    const [displayMode, setDisplayMode] = useState(true)
    const [contents, setContents] = useState([]);
    const showData = async () => {
        if (contents.length === 0){
            const docSnap = await getDoc(task.contents);
            let docData = docSnap.data().contents;
            for (let i = 0; i < docData.length; i++){
                const url = await getDownloadURL(ref(storage, docData[i].markImg));
                docData[i].markImgURL = url;
            }
            setContents(docData);
        }
        setShowItem(true);
    }

    const renderImg = () =>{
        if (task.taskImgURL !== undefined){
            return (<Card.Img className="fixImg" src={task.taskImgURL}/>);
        }
        return null;
    }

    return(
        <>
        <Card className="text-center" border="secondary" onClick={showData}>
            <Card.Header>{task.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{task.taskDesc}</Card.Text>
                {renderImg()}
            </Card.Body>
        </Card>
        <TaskView task={task} displayMode={displayMode} setDisplayMode={setDisplayMode} setTask={setTask} contents={contents} setContents={setContents} showItem={showItem} setShowItem={setShowItem}/>
        </>
    )
};

export default CardElement;