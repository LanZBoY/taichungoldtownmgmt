import React from "react";
import { Nav, Navbar } from "react-bootstrap/esm";
import { LinkContainer } from "react-router-bootstrap";
const topbar = ({currentKey}) => {
    return(
        <>
            <Navbar sticky="top" bg="dark" variant="dark" expand='lg'>
                <Navbar.Brand><h1>臺中城中城APP任務管理系統</h1></Navbar.Brand>
            </Navbar>
            <Nav variant="tabs" activeKey={currentKey}>
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
        </>
        
    )
};

export default topbar