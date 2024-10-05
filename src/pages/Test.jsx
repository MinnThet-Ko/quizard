import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import db from "../firebase";

function Test(){
    console.log("In the Test component:")
    const [testData, setTestData] = useState([])

    const params = useParams();
    
    useEffect(() => { async function getTestData(){

        const refTestDoc = doc(db, "tests", params.testId)
        const resultTestDoc = await getDoc(refTestDoc);
        setTestData(resultTestDoc.data().test_data)
    }
        getTestData()
    },[params])


    return(<>
        {testData.length}
    </>)
}

export default Test