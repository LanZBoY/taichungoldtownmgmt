import React, { Fragment, useState } from "react";
import TaskView from "./TaskView";
import { Task } from "../model/Task";
import { Card } from "react-bootstrap";
const NewContentButton = () => {
    const [newTask, setNewTask] = useState(new Task());
    const [newContents, setNewContents] = useState([]);
    const [showItem, setShowItem] = useState(false);

    return (
        <Fragment>
            <Card onClick={() => setShowItem(true)} bg='success' className="cardList text-center" text='white'>
                <Card.Header>新增項目</Card.Header>
            </Card>
            <TaskView createMode task={newTask} setTask={setNewTask} contents={newContents} setContents={setNewContents} showItem={showItem} setShowItem={setShowItem} disabled={false} />
        </Fragment>
    );
}

export default NewContentButton