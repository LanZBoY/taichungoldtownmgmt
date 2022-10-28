import React, { Fragment, useState } from "react";
import TaskView from "./TaskView";
import TaskModel from '../model/Task.json'
import { Card } from "react-bootstrap";
const NewContentButton = ({ setLoadingModal, setTasks }) => {
    const [showItem, setShowItem] = useState(false);
    const [task, setTask] = useState({...TaskModel});
    const [contents, setContents] = useState([]);
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