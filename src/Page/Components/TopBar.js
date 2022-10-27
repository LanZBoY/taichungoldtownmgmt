import React, { Fragment } from "react";
import { Badge, Nav, Navbar } from "react-bootstrap/esm";
import { LinkContainer } from "react-router-bootstrap";
const TopBar = ({currentKey, hideNav}) => {
    return(
        <Fragment>
            <Navbar sticky="top" bg="dark" variant="dark" expand='lg'>
                <Navbar.Brand><h1>臺中城中城APP任務管理系統 <Badge bg="warning" text="dark">測試中</Badge></h1> </Navbar.Brand>
            </Navbar>
            <Nav variant="tabs" activeKey={currentKey} hidden = {hideNav}>
                <Nav.Item>
                        <LinkContainer to='/home'>
                            <Nav.Link  eventKey="homepage">首頁</Nav.Link>
                        </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                <LinkContainer to='/tasklist'>
                        <Nav.Link  eventKey="tasklist">任務列表</Nav.Link>
                        </LinkContainer>
                </Nav.Item>
            </Nav>
        </Fragment>
        
    )
};

export default TopBar