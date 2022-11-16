import React, { Fragment, useState } from "react";
import TaskView from "./TaskView";
import { Card } from "react-bootstrap";
import { Content, Task } from "../../model/DataModel";
const NewContentButton = ({ setLoadingModal, setTasks }) => {
    const [showItem, setShowItem] = useState(false);
    const [task, setTask] = useState(new Task());
    const [contents, setContents] = useState([new Content()]);
    return (
        <Fragment>
            <Card  onClick={() => setShowItem(true)} bg='success' className="cardList text-center" text='white'>
                <Card.Header>新增項目</Card.Header>
            </Card>
            <TaskView createMode setLoadingModal={setLoadingModal} task={task} setTask={setTask} setTasks={setTasks} contents={contents} setContents={setContents} showItem={showItem} setShowItem={setShowItem} />
        </Fragment>
    );
}

export default NewContentButton