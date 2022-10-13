import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";


const Mark = ({data}) =>{
    const [mark, setMark] = useState(data);
    console.log(mark);
    const handleMarkChange = (e) => {
        if(e.target.id === 'markTitle'){
            setMark((prev) =>{
                return {...prev, markTitle: e.target.value}
            });
        }else if(e.target.id === 'markContent'){

        }else if(e.target.id === 'markLatitude'){
            setMark((prev) =>{
                return {...prev, markLatitude: parseFloat(e.target.value)}
            });
        }else if(e.target.id === 'markLongitude'){
            setMark((prev) =>{
                return {...prev, markLongitude: parseFloat(e.target.value)}
            });
        }
        
    }

    return (
        <>
        <hr/>
        <FormGroup>
            <Form.Label >導覽地點</Form.Label>
            <Form.Control id="markTitle" type="text" value={mark.markTitle} onChange={handleMarkChange}></Form.Control>
            <Form.Label>地點內容</Form.Label>
            {/* 會有多個內容 */}
            <Form.Control type="text"></Form.Control>
            <Button>新增內容</Button>
        </FormGroup>
        <Form.Label>經度</Form.Label><Form.Control type="number" id = 'markLongitude' value={mark.markLongitude} onChange={handleMarkChange}></Form.Control>
        <Form.Label>緯度</Form.Label><Form.Control type="number" id = 'markLatitude' value={mark.markLatitude} onChange={handleMarkChange}></Form.Control>
        <Form.Control id="taskFile" type="file"></Form.Control>
        <hr/>
        </>
    );
}


export default Mark;