import React from "react";
import { Card } from "react-bootstrap";
const CardElement = ({data}) => {
    return(
        <>
        <Card className="text-center" border="secondary">
            <Card.Header>{data.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{data.taskDesc}</Card.Text>
                <Card.Img className="fixImg" src={data.taskImg}/>
            </Card.Body>
        </Card>
        </>
    )
};

export default CardElement;