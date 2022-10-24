import React, { useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import { firestore } from "./utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./utils/firebase"
import { collection, getDocs } from "firebase/firestore";
import CardElement from './Components/CardElement'
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskListPage.css'
import NewContentButton from "./Components/NewContentButton";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getDocs(collection(firestore, 'tasks')).then((result) => {
            result.docs.forEach(async (doc) => {
                const data = doc.data();
                data.id = doc.id;
                const url = await getDownloadURL(ref(storage, data.taskImg));
                data.taskImgURL = url;
                setTasks((prev) => {
                    return [...prev, data]
                })
            })
        });

    }, [])
    return (
        <>
            <TopBar currentKey={'tasklist'} />
            <Container>
                {tasks.map((taskData) => {
                    return <CardElement taskData={taskData} key={taskData.id} />
                })}
            <NewContentButton />
            </Container>
        </>
    )
};

export default TaskList;