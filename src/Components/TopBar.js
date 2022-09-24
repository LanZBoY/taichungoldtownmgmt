import React from "react";
import { Nav } from "react-bootstrap/esm";

const topbar = ({currentKey}) => {
    console.log(currentKey);
    return(
        <Nav variant="tabs" activeKey={currentKey}>
            <Nav.Item>
                <Nav.Link href="/" eventKey="homepage">首頁</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/tasklist" eventKey="tasklist">任務列表</Nav.Link>
            </Nav.Item>
        </Nav>
    )
};

export default topbar