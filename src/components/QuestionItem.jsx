import { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

import "../assets/styles/question.styles.css"

function QuestionItem({ questionNumber, answerList, handleAnswerSelect, testItem, isSubmitted }) {

    const [possibleAnswers, setPossibleAnswers] = useState([]);
    const [testItemStyle, setTestItemStyle] = useState("")

    useEffect(() => {
        randomizeAnswers(answerList, [testItem.answer])
    }, [answerList])

    useEffect(() => {
        async function initializeClass() {

            if (testItem.selected_answer !== "") {
                if (isSubmitted && testItem.selected_answer === testItem.answer) {
                    setTestItemStyle("correct-test-item")
                } else if (isSubmitted && testItem.selected_answer !== testItem.answer) {
                    setTestItemStyle("incorrect-test-item")
                }
            }

        }
        initializeClass()

    }, [testItem, isSubmitted])

    const shuffleArray = (answerArray) => {
        let count = answerArray.length;
        while (count != 0) {
            let randomIndex = Math.floor(Math.random() * count);
            count--;
            [answerArray[count], answerArray[randomIndex]] = [answerArray[randomIndex], answerArray[count]]
        }
    }

    const randomizeAnswers = (answerList, exclusionList) => {
        if (exclusionList.length == 4) {
            shuffleArray(exclusionList)
            setPossibleAnswers(exclusionList)
            return;
        }

        let randomAnswer = answerList[Math.floor(Math.random() * answerList.length)];

        if (exclusionList.includes(randomAnswer)) {
            randomizeAnswers(answerList, exclusionList);
        } else {
            exclusionList.push(randomAnswer);
            randomizeAnswers(answerList, exclusionList)
        }

    }

    return (
        <Container className={testItemStyle + " question-item"}>
            <Row className="question-row">
                <Col xs={1} md={1} lg={1} className="question-number">{questionNumber}.</Col>
                <Col xs={11} md={11} lg={11} className="question">{testItem.question}</Col>
            </Row>
            <Row>
                {possibleAnswers.map((answer, index) => {
                    return (
                        <Col key={index}>
                            <Form.Check key={index} className="answer"
                                inline
                                name={testItem.question}
                                type='radio'
                                value={answer}
                                label={answer}
                                onChange={handleAnswerSelect}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default QuestionItem