import React from "react";
import { Nav, Navbar } from "react-bootstrap/esm";

const topbar = ({currentKey}) => {
    return(
        <>
            <Navbar sticky="top" bg="dark" variant="dark" expand='lg'>
                <Navbar.Brand >臺中城中城後台管理系統</Navbar.Brand>
            </Navbar>
            <Nav variant="tabs" activeKey={currentKey}>
                <Nav.Item>
                    <Nav.Link href="/" eventKey="homepage">首頁</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/tasklist" eventKey="tasklist">任務列表</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
        
    )
};

export default topbar