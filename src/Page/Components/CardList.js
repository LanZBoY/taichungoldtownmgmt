import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TaskContent from "./TaskContent";
import { storage } from "../utils/firebase"
import { ref, getDownloadURL } from "firebase/storage";
const CardElement = ({doc}) => {
    const data = doc.data;
    const [showItem, setShowItem] = useState(false);
    const [imgURL, setImgURL] = useState('');
    const handleShowItem = () => setShowItem(true);
    const imgRef = ref(storage, data.taskImg);
    useEffect(()=>{
        getDownloadURL(imgRef).then((url)=>{
            setImgURL(url);
        });
    },[imgRef])
    return(
        <>
        <Card className="text-center" border="secondary" onClick={handleShowItem}>
            <Card.Header>{data.taskTitle}</Card.Header>
            <Card.Body>
                <Card.Text>{data.taskDesc}</Card.Text>
                <Card.Img className="fixImg" src={imgURL}/>
            </Card.Body>
        </Card>
        <TaskContent create={false} showItem={showItem} setShowItem={setShowItem} doc={doc} disabled = {true}/>
        </>
    )
};

export default CardElement;