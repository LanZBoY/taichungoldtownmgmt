import React from "react";
import { Nav, Navbar } from "react-bootstrap/esm";

const topbar = ({currentKey}) => {
    return(
        <>
            <Navbar sticky="top" bg="dark" variant="dark" expand='lg'>
                <Navbar.Brand><h1>臺中城中城APP任務管理系統</h1></Navbar.Brand>
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