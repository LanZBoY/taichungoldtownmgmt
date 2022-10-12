import React, { useState } from "react";
import { Card } from "react-bootstrap";
import TaskContent from "./TaskContent";
const CardElement = ({doc}) => {
    const data = doc.data;
    const [showItem, setShowItem] = useState(false);
    const handleShowItem = () => setShowItem(true)
    return(
        <>
        <Card className="text-center" onClick={handleShowItem}>
            <Card.Header>{data.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{data.taskDesc}</Card.Text>
                <Card.Img/>
            </Card.Body>
        </Card>
        <TaskContent header="詳細內容" showItem={showItem} setShowItem={setShowItem} doc={doc}/>
        </>
    )
};

export default CardElement;