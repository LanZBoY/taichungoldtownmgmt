import React from "react";
import { Button, Form, FormGroup } from "react-bootstrap";


const Mark = ({contents, setContents, index}) =>{
    const handleMarkChange = (e) => {
        if(e.target.id === 'markTitle'){
            setContents((prev) => {
                prev[index].markTitle = e.target.value
                return [...prev]
            });
        }else if(e.target.id === 'markContent'){
            const contentIndex = e.target.getAttribute('index');
            setContents((prev) => {
                prev[index].markContent[contentIndex] = e.target.value;
                return [...prev]
            })
        }else if(e.target.id === 'markLatitude'){
            setContents((prev) => {
                prev[index].markLatitude = e.target.value
                return [...prev]
            });
        }else if(e.target.id === 'markLongitude'){
            setContents((prev) => {
                prev[index].markLongitude = e.target.value
                return [...prev]
            });
        }
        
    }

    const renderMartContent = () => {
        const reuslt = contents[index].markContent.map((content, index) =>{
            return <Form.Control key={index} id="markContent" type="text" value={content} index = {index} onChange={handleMarkChange}></Form.Control>;
        });
        return reuslt;
    }

    const addContent = () => {
        setContents((prev) => {
            prev[index].markContent = [...prev[index].markContent, ""]
            return [...prev]
        });
    }

    return (
        <>
        <hr/>
        <FormGroup>
            <Form.Label >導覽地點</Form.Label>
            <Form.Control id="markTitle" type="text" value={contents[index].markTitle}  onChange={handleMarkChange}></Form.Control>
            <Form.Label>地點內容</Form.Label>
            {renderMartContent()}
            <Button onClick={addContent}>新增內容</Button>
        </FormGroup>
        <Form.Label>經度</Form.Label><Form.Control type="number" id = 'markLongitude' onChange={handleMarkChange}></Form.Control>
        <Form.Label>緯度</Form.Label><Form.Control type="number" id = 'markLatitude' onChange={handleMarkChange}></Form.Control>
        <Form.Control id="taskFile" type="file"></Form.Control>
        <hr/>
        </>
    );
}


export default Mark;