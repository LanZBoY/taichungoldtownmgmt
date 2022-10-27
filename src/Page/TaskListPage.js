import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import TopBar from './Components/TopBar'
import { firestore } from "./utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./utils/firebase"
import { collection, getDocs } from "firebase/firestore";
import CardElement from './Components/CardElement'
import { Container, Image, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskListPage.css'
import loadingIcon from './statics/Icon/Spin-1s-200px.gif'
import NewContentButton from "./Components/NewContentButton";

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loadingModal, setLoadingModal] = useState(false);

    useEffect(() => {
        getDocs(collection(firestore, 'tasks')).then((result) => {
            result.docs.forEach(async (doc) => {
                const data = doc.data();
                data.id = doc.id;
                if(data.taskImg !== ''){
                    const url = await getDownloadURL(ref(storage, data.taskImg));
                    data.taskImgURL = url;
                }
                setTasks((prev) => {
                    return [...prev, data]
                })
            })
        });

    }, [])
    
    return (
        <Fragment>
            <Modal show ={loadingModal} backdrop='static' centered>
                <Modal.Body>
                    <Image className="mx-auto d-block" src={loadingIcon}/>
                </Modal.Body>
            </Modal>
            <TopBar currentKey={'tasklist'} />
            <Container>
                {tasks.map((taskData) => {
                    return <CardElement taskData={taskData} setLoadingModal={setLoadingModal} key={taskData.id} />
                })}
            <NewContentButton setLoadingModal={setLoadingModal} />
            </Container>
        </Fragment>
    )
};

export default TaskListPage;