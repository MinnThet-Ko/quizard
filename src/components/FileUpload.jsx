import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import * as XLSX from "xlsx"

function FileUpload() {

    const [fileData, setFileData] = useState({});
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
            const questions  = [];
            sheetData.map((row) => {
                questions.push({question: row.question, answer: row.answer});
            })

            setFileData(questions)
        }
        reader.readAsArrayBuffer(file);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(fileData)
    }
    return (<>
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <FormLabel>Upload a file:</FormLabel>
                <FormControl type="file" onChange={handleFileUpload}/>
            </FormGroup>
            <Button type="submit">Upload</Button>
        </Form>
    </>)
}

export default FileUpload