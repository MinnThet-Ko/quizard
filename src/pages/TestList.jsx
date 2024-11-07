import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import db from "../firebase"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import { Col, Container, Row } from "react-bootstrap"
import TestItemCard from "../components/TestItemCard"

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
    return (<>
        <Container>
            <Row>
                <Col>
                    
                        {
                            testList.map((test) => {
                                return (
                                    <TestItemCard test={test}/>
                                )
                            })
                        }
                    
                </Col>
            </Row>

        </Container>

    </>)
}

export default TestList