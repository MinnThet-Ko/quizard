import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import QuestionItem from "../components/QuestionItem";
import db from "../firebase";
import { Button, Form } from "react-bootstrap";
import DialogModal from "../components/DialogModal";

import "../assets/styles/test.styles.css";

function Test() {

    // State for this class
    const [testName, setTestName] =  useState("")
    const [testData, setTestData] = useState([])
    const [answersList, setAnswerList] = useState([])
    const [selectAnswers, setSelectedAnswer] = useState([])

    const [maxScore, setMaxScore] = useState(0)
    const [totalScore, setTotalScore] = useState(0)
    const [displayModal, setDisplayModal] = useState(false)

    //I have no idea what is this for.
    const params = useParams();
    
    const shuffleQuestions = (testQuestions) => {
        let count = testQuestions.length;
        while (count != 0) {
            let randomIndex = Math.floor(Math.random() * count); 
                count--;
            [testQuestions[count], testQuestions[randomIndex]] = [testQuestions[randomIndex], testQuestions[count]]
        }
    }
    useEffect(() => {
        async function getTestData() {

            const refTestDoc = doc(db, "tests", params.testId);
            const resultTestDoc = await getDoc(refTestDoc);
            setTestName(resultTestDoc.data().test_name)
            const resultTestData = resultTestDoc.data().test_data;
            shuffleQuestions(resultTestData)
            setTestData(resultTestData)
            setMaxScore(resultTestData.length)
            const tempAnswerList = [];
            resultTestData.map(test => tempAnswerList.push(test.answer));
            setAnswerList(tempAnswerList);
            
        }
        getTestData()
    }, [])



    const handleAnswerSelect = (e) => {
        let stringArr = e.target.value.split("-");
        let choice = {
            question: stringArr[0],
            answer: stringArr[1]
        }
        let dummyList = selectAnswers
        let isExists = false;
        dummyList.forEach((answer) => {
            if (answer.question === choice.question) {
                answer.answer = choice.answer
                isExists = true;
            }
        })
        if (!isExists) {
            dummyList.push(choice)
        }
        setSelectedAnswer(dummyList)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let correctAnswerCount = 0;
        selectAnswers.forEach((selectAnswer) => {
            const testQuestion = testData.find((element) => element.question === selectAnswer.question)
            console.log(testQuestion)
            if (testQuestion.answer.toString() === selectAnswer.answer) {
                correctAnswerCount++;
            }
        })
        setTotalScore(correctAnswerCount)
        setDisplayModal(true)
    }


    const handleRetakeClick = (e) => {
        console.log("In handleRetakeClick")
        setDisplayModal(false)
        setTotalScore(0)
        setSelectedAnswer([])
        const questionsPlaceholder = testData
        shuffleQuestions(questionsPlaceholder)
        setTestData(questionsPlaceholder)

        const tempAnswerList = [];
        questionsPlaceholder.map(test => tempAnswerList.push(test.answer));
        setAnswerList(tempAnswerList);
    }

    return (
        <div className="test-container">
            {displayModal && <DialogModal totalScore={totalScore} maxScore={maxScore} resetClickHandler={handleRetakeClick}/>}
            
            <Form onSubmit={handleFormSubmit} className="test-form">
            <h3 className="test-name">
                {testName}
            </h3>
                {

                    testData.map((testItem, index) => {
                        return (
            
                                <QuestionItem  key={index} questionNumber={index+1} question={testItem.question} answerList={answersList} answer={testItem.answer} handleAnswerSelect={handleAnswerSelect} />
 
                        )
                    })
                }

                <Button type="submit" className="submit-button">Submit</Button>
            </Form>
        </div>)
}

export default Test