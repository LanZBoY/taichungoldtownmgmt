import React from "react";
import { Card, Container, Button } from "react-bootstrap";
const cardElement = () =>{
    return(
        <Container>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>第一張卡片</Card.Title>
                    <Card.Text>這是第一張卡片什麼都沒有</Card.Text>
                    <Button variant="warning">修改</Button>
                    <Button variant="danger">刪除</Button>
                </Card.Body>
            </Card>
        </Container>
    )
};

export default cardElement;