import React from "react";
import { Card } from "react-bootstrap";
const cardElement = ({doc}) =>{
    const data = doc.data;

    const showClick = (event) =>{
        alert(`你點了 ${data.taskTitle}`);
    }

    return(
        <Card className="text-center" onClick={showClick} >
            <Card.Header>{data.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{data.taskDesc}</Card.Text>
                <Card.Img/>
            </Card.Body>
        </Card>
    )
};

export default cardElement;