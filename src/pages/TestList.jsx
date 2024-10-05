import { useEffect, useState } from "react"
import {getDocs, collection} from "firebase/firestore"
import db from "../firebase"
import Test from "./Test"
import { Link } from "react-router-dom"

function TestList() {
    const [testList, setTestList] = useState([])

    useEffect(() => {async function getAllTests(){
        const querySnapshot = await getDocs(collection(db, "tests"));
        const resultTestList = []
        querySnapshot.forEach((doc) => {
            console.log(doc.id +"=>"+doc.data().test_name)
            resultTestList.push({
                test_id: doc.id,
                test_name: doc.data().test_name
            })
        });
        setTestList(resultTestList)

    }
    getAllTests();
    }, [])
    return (<>
        {
            testList.map((test) => {
                return  <Link key={test.test_id} to={{ pathname: '/test/'+test.test_id }}>{test.test_name}</Link>
            })
        }
    </>)
}

export default TestList