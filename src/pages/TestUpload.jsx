import { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import * as XLSX from "xlsx"
import db from "../firebase"
import { addDoc, collection } from "firebase/firestore";

function TestUpload() {

    const [fileData, setFileData] = useState({});
    const [testName, setTestName] = useState("");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);
            const questions = [];
            sheetData.map((row) => {
                questions.push({ question: row.question, answer: row.answer });
            })
            console.log(questions)
            setFileData(questions)
        }
        reader.readAsArrayBuffer(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "tests"), {
            test_name: testName,
            test_data: fileData
        });
    }

    const handleTestNameChange = (e) => {
        setTestName(e.target.value);
    }
    return (<>
        <Form onSubmit={handleFormSubmit}>
            <FormGroup>
                <FormLabel>Enter test name:</FormLabel>
                <FormControl type="text" onChange={handleTestNameChange} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Upload a file:</FormLabel>
                <FormControl type="file" onChange={handleFileUpload} />
            </FormGroup>
            <Button type="submit">Upload</Button>
        </Form>
    </>)
}

export default TestUpload