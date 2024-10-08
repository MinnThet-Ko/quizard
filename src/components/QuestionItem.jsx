import { useEffect, useState } from "react";

function QuestionItem({ question, answerList, answer, handleAnswerSelect }) {

    const [possibleAnswers, setPossibleAnswers] = useState([]);
    useEffect(() => {
        randomizeAnswers(answerList, [answer])
    },[])

    const randomizeAnswers = (answerList, exclusionList) => {

        if (exclusionList.length == 4) {
            setPossibleAnswers(exclusionList)
            return;
        }

        let randomAnswer = Math.floor(Math.random() * answerList.length);
        if (exclusionList.includes(randomAnswer)) {
            randomizeAnswers(answerList, exclusionList);
        } else {
            exclusionList.push(randomAnswer);
            randomizeAnswers(answerList, exclusionList)
        }

    }
    return (
        <div>
            {question}
            {possibleAnswers}
        </div>
    )
}

export default QuestionItem