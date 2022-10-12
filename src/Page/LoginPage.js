import React, { useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";

const LoginPage = () => {
    const correctUserName = "admin";
    const correctPassword = "1215";
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        const target = event.target;
        if (target.id === 'userName'){
            setUserName(()=>{
                return target.value;
            });
        }else if(target.id === 'password'){
            setPassword(()=>{
                return target.value;
            });
        }
    }

    const login = () =>{
        if (correctUserName === userName && correctPassword === password){
            alert('登入成功!!');
            window.location.href = "/home";
        }else{
            alert('帳號或密碼錯誤!!');
        }
    }

    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark" expand='lg'>
                <Navbar.Brand><h1>臺中城中城APP任務管理系統</h1></Navbar.Brand>
            </Navbar>
            <Container className="text-center">
                <Form.Group>
                    <Form.Label>管理者帳號</Form.Label>
                    <Form.Control id="userName" type="text" value={userName} onChange={handleChange}></Form.Control>
                    <Form.Label>管理者密碼</Form.Label>
                    <Form.Control id="password" type="password" value={password} onChange={handleChange}></Form.Control>
                    <Button onClick={login}>登入</Button>
                </Form.Group>
            </Container>
        </>

    )
};

export default LoginPage;