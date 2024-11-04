import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import "../assets/styles/question.styles.css"

function QuestionItem({questionNumber, question, answerList, answer, handleAnswerSelect }) {

    const [possibleAnswers, setPossibleAnswers] = useState([]);

    useEffect(() => {
        randomizeAnswers(answerList, [answer])
    }, [])

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
        <div className="question-item">
            <div className="question-number">
                {questionNumber}.
            </div>
            <div>
                <div className="question">{question}</div>
                {possibleAnswers.map((answer, index) => {
                    return (
                        <Form.Check key={index} className="answer"
                            inline
                            name={"group-" + question}
                            type='radio'
                            value={question + "-" + answer}
                            label={answer}
                            onChange={handleAnswerSelect}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionItem