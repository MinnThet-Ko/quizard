import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import QuestionItem from "../components/QuestionItem";
import db from "../firebase";

function Test() {
    const [testData, setTestData] = useState([])
    const [answersList, setAnswerList] = useState([])

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



    const handleAnswerSelect = () => {
        return "This is a test";
    }

    return (<>
        {

            testData.map((testItem) => {
                console.log(testItem)
                return (
                    <QuestionItem question={testItem.question} answerList={answersList} answer={testItem.answer} handleAnswerSelect={handleAnswerSelect} />
                )
            })
        }
    </>)
}

export default Test