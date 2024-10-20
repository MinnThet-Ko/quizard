import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import db from "../firebase"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import { Col, Container, Row } from "react-bootstrap"

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
                    <ul>
                        {
                            testList.map((test) => {
                                return <li>
                                    <Link key={test.test_id} to={{ pathname: '/test/' + test.test_id }}>{test.test_name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </Col>
            </Row>

        </Container>

    </>)
}

export default TestList