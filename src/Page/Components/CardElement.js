import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { getDoc } from "firebase/firestore";
import TaskView from "./TaskView";
const CardElement = ({taskData}) => {
    const [task, setTask] = useState(taskData);
    const [showItem, setShowItem] = useState(false);
    const [contents, setContents] = useState([]);
    const showData = async () => {
        const docSnap = await getDoc(task.contents);
        setContents(docSnap.data().contents);
        setShowItem(true);
    }

    return(
        <>
        <Card className="text-center" border="secondary" onClick={showData}>
            <Card.Header>{task.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{task.taskDesc}</Card.Text>
                <Card.Img className="fixImg" src={task.taskImg}/>
            </Card.Body>
        </Card>
        <TaskView task={task} setTask={setTask} contents={contents} setContents={setContents} showItem={showItem} setShowItem={setShowItem}/>
        </>
    )
};

export default CardElement;