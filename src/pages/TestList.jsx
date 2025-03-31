import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import db from "../firebase"
import "bootstrap/dist/css/bootstrap.css"
import TestItemCard from "../components/TestItemCard"

import "../assets/styles/test-list.styles.css"

function TestList() {
    const [testList, setTestList] = useState([])

    useEffect(() => {
        async function getAllTests() {
            const querySnapshot = await getDocs(collection(db, "tests"));
            const resultTestList = []
            querySnapshot.forEach((doc) => {
                console.log(doc.id + "=>" + doc.data().test_name)
                resultTestList.push({
                    test_id: doc.id,
                    test_name: doc.data().test_name
                })
            });
            setTestList(resultTestList)

        }
        getAllTests();
    }, [])
    return (<div className="test-list-container">


        {
            testList.map((test) => {
                return (
                    <TestItemCard test={test} key={test.test_id}/>
                )
            })
        }



    </div>)
}

export default TestList