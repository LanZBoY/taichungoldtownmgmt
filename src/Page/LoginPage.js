import React, { useState } from "react";
import { Button, Container, Form} from "react-bootstrap";
import { User } from "../model/DataModel";
import TopBar from "./Components/TopBar";
const LoginPage = () => {
    const correctUserName = "admin";
    const correctPassword = "1215";
    const [currentUser, setCurrentUser] = useState(new User());
    const handleChange = (event) => {
        const target = event.target;
        if (target.id === 'userName'){
            setCurrentUser((prev) => {
                return new User({...prev, username : target.value});
            });
        }else if(target.id === 'password'){
            setCurrentUser((prev) => {
                return {...prev, password: target.value}
            });
        }
    }

    const login = () =>{
        if (correctUserName === currentUser.username && correctPassword === currentUser.password){
            alert('登入成功!!');
            window.location.href = "/home";
        }else{
            alert('帳號或密碼錯誤!!');
        }
    }

    return (
        <>
            <TopBar hideNav/>
            <Container className="text-center">
                <Form.Group>
                    <Form.Label>管理者帳號</Form.Label>
                    <Form.Control id="userName" type="text" value={currentUser.username} onChange={handleChange}></Form.Control>
                    <Form.Label>管理者密碼</Form.Label>
                    <Form.Control id="password" type="password" value={currentUser.password} onChange={handleChange}></Form.Control>
                    <Button onClick={login}>登入</Button>
                </Form.Group>
            </Container>
        </>

    )
};

export default LoginPage;