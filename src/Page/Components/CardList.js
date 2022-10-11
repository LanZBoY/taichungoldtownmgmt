import React from "react";
import { Card, Button } from "react-bootstrap";
const cardElement = ({data}) =>{
    return(
        <Card className="text-center">
            <Card.Header>{data.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{data.taskDesc}</Card.Text>
                <Card.Img/>
                <Button variant="warning">修改</Button>
                <Button variant="danger">刪除</Button>
            </Card.Body>
        </Card>
    )
};

export default cardElement;