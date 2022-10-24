import React from "react";
import { Button, Col, Form, FormGroup, InputGroup, Row } from "react-bootstrap";


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

    const handleDelMarkContent = (e) => {
        const contentIndex = e.target.getAttribute('index');
        console.log(contents[index].markContent);
        setContents((prev) => {
            prev[index].markContent.splice(contentIndex, 1);
            return [...prev];
        });
    };

    const renderMartContent = () => {
        const reuslt = contents[index].markContent.map((content, index) =>{
            const hint = `填入內容 ${index + 1}`;
            
            return (
                <InputGroup className="inputField">
                    <Form.Control key={index} id="markContent" type="text" as='textarea' rows={5} value={content} index={index} onChange={handleMarkChange} placeholder={hint}></Form.Control>
                    <Button variant="danger" onClick={handleDelMarkContent} index = {index}>刪除</Button>
                </InputGroup>
                
            );
        });
        return reuslt;
    }

    const addMarkContent = () => {
        setContents((prev) => {
            prev[index].markContent = [...prev[index].markContent, ""]
            return [...prev]
        });
    }

    const handleDelContent = (index) =>{
        setContents((prev) =>{
            prev.splice(index, 1);
            return [...prev]
        })
    }

    return (
        <>
        <hr/>
        <FormGroup>
            <Form.Label className="inputField">導覽地點({index + 1})</Form.Label>
            <Form.Control id="markTitle" type="text" value={contents[index].markTitle}  onChange={handleMarkChange}></Form.Control>
            <Form.Label className="inputField">地點內容({index + 1})</Form.Label>
            {renderMartContent()}
                <Button onClick={addMarkContent}>新增內容</Button>
        </FormGroup>
        <Row className="mb-3">
            <Form.Group as = {Col} md="6">
                <Form.Label className="inputField">經度</Form.Label>
                <Form.Control type="number" id = 'markLongitude' value={contents[index].markLongitude} onChange={handleMarkChange} placeholder='經度'></Form.Control>
            </Form.Group>
            <Form.Group as = {Col} md="6">
                <Form.Label className="inputField">緯度</Form.Label>
                <Form.Control type="number" id = 'markLatitude' value={contents[index].markLatitude} onChange={handleMarkChange} placeholder='緯度'></Form.Control>
            </Form.Group>
        </Row>
            <Form.Control className="inputField" id="taskFile" type="file"></Form.Control>
            <Button variant="danger" onClick={handleDelContent}>刪除導覽地點</Button>
        </>
    );
}


export default Mark;