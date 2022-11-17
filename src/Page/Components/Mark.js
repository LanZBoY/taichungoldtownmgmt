
import { Fragment } from "react";
import { Button, Col, Form, FormGroup, InputGroup, Row, Image } from "react-bootstrap";
import { MARK } from "../../model/DataSchema";

const Mark = ({ contents, setContents, displayMode, index }) => {

    const handleMarkChange = (e) => {
        if (e.target.id === MARK.MARK_TITLE) {
            setContents((prev) => {
                prev[index].markTitle = e.target.value
                return [...prev]
            });
        } else if (e.target.id === MARK.MARK_CONTENT) {
            const contentIndex = e.target.getAttribute('index');
            setContents((prev) => {
                prev[index].markContent[contentIndex] = e.target.value;
                return [...prev]
            })
        } else if (e.target.id === MARK.MARK_LAT) {
            setContents((prev) => {
                prev[index].markLatitude = e.target.value
                return [...prev]
            });
        } else if (e.target.id === MARK.MARK_LONG) {
            setContents((prev) => {
                prev[index].markLongitude = e.target.value
                return [...prev]
            });
        } else if (e.target.id === MARK.MARK_FILE){
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setContents((prev) => {
                prev[index].markImgBlob = file;
                prev[index].markImgURL = url;
                prev[index].markImg = file.name;
                return [...prev]
            })
        }

    }

    const handleDelMarkContent = (e) => {
        const contentIndex = e.target.getAttribute('index');
        setContents((prev) => {
            prev[index].markContent.splice(contentIndex, 1);
            return [...prev];
        });
    };

    const renderMartContent = () => {
        const reuslt = contents[index].markContent.map((content, index) => {
            const hint = `填入內容 ${index + 1}`;

            return (
                <InputGroup key={index} className="inputField">
                    <Form.Control id={MARK.MARK_CONTENT} type="text" as='textarea' rows={5} value={content} index={index} onChange={handleMarkChange} placeholder={hint} disabled={displayMode}></Form.Control>
                    <Button variant="danger" onClick={handleDelMarkContent} index={index} hidden={displayMode}>刪除</Button>
                </InputGroup>

            );
        });
        return reuslt;
    }

    const renderImg = () => {
        if (contents[index].markImgURL !== undefined) {
            return (<Image src={contents[index].markImgURL} thumbnail style={{
                height: "50rem",
                width: "auto"
            }}></Image>)
        }
        return null;
    }

    const addMarkContent = () => {
        setContents((prev) => {
            prev[index].markContent = [...prev[index].markContent, ""]
            return [...prev]
        });
    }

    const handleDelContent = () => {
        setContents((prev) => {
            console.log(prev);
            prev.splice(index, 1);
            console.log(prev);
            return [...prev]
        })
    }

    return (
        <Fragment>
            <hr />
            <FormGroup>
                <Form.Label className="inputField h3">導覽地點({index + 1})</Form.Label>
                <Form.Control id={MARK.MARK_TITLE} type="text" value={contents[index].markTitle} placeholder="填入導覽地點" onChange={handleMarkChange} disabled={displayMode}></Form.Control>
                <Form.Label className="inputField h3">地點內容({index + 1})</Form.Label>
                {renderMartContent()}
                <Button onClick={addMarkContent} hidden={displayMode}>新增內容</Button>
            </FormGroup>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label className="inputField h3">經度</Form.Label>
                    <Form.Control type="number" id={MARK.MARK_LONG} value={contents[index].markLongitude} onChange={handleMarkChange} disabled={displayMode} placeholder='經度'></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label className="inputField h3">緯度</Form.Label>
                    <Form.Control type="number" id={MARK.MARK_LAT} value={contents[index].markLatitude} onChange={handleMarkChange} disabled={displayMode} placeholder='緯度'></Form.Control>
                </Form.Group>
            </Row>
            {renderImg()}
            <Form.Control className="inputField h3" id={MARK.MARK_FILE} type="file" onChange={handleMarkChange} disabled={displayMode}></Form.Control>
            <Button variant="danger" onClick={handleDelContent} hidden={displayMode}>刪除導覽地點</Button>
        </Fragment>
    );
}


export default Mark;