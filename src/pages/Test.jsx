import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import QuestionItem from "../components/QuestionItem";
import db from "../firebase";
import { Button, Form } from "react-bootstrap";

function Test() {
    const [testData, setTestData] = useState([])
    const [answersList, setAnswerList] = useState([])
    const [selectAnswers, setSelectedAnswer] = useState([])

    const params = useParams();

    useEffect(() => {
        async function getTestData() {

            const refTestDoc = doc(db, "tests", params.testId);
            const resultTestDoc = await getDoc(refTestDoc);
            const resultTestData = resultTestDoc.data().test_data;
            setTestData(resultTestData)
            const tempAnswerList = [];
            resultTestData.map(test => tempAnswerList.push(test.answer));
            setAnswerList(tempAnswerList);
        }
        getTestData()
    }, [params])



    const handleAnswerSelect = (e) => {
        let stringArr = e.target.value.split("-");
        let choice = {
            question: stringArr[0],
            answer: stringArr[1]
        }
        let dummyList = selectAnswers
        let isExists = false;
        dummyList.forEach((answer) => {
            if(answer.question === choice.question){
                answer.answer = choice.answer
                isExists = true;
            }
        })
        if(!isExists){
            dummyList.push(choice)
        }
        setSelectedAnswer(dummyList)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let correctAnswerCount = 0;
        selectAnswers.forEach((selectAnswer) =>{
            const testQuestion = testData.find((element) => element.question === selectAnswer.question) 
            console.log(testQuestion)
            if(testQuestion.answer.toString() === selectAnswer.answer){
                correctAnswerCount++;
            }
        })
        window.alert("Your score is "+correctAnswerCount+"/"+testData.length)
    }

    return (<Form onSubmit={handleFormSubmit}>
        {

            testData.map((testItem) => {
                return (
                    <QuestionItem key={testItem.question} question={testItem.question} answerList={answersList} answer={testItem.answer} handleAnswerSelect={handleAnswerSelect} />
                )
            })
        }

        <Button type="submit">Submit</Button>
    </Form>)
}

export default Test