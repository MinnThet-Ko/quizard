import { Button } from "react-bootstrap"
import "../assets/styles/test-item-card.styles.css"

function TestItemCard({test}){
    return (
        <div className="test-item-card">
            <div className="test-card-title">{test.test_name}</div>
            <Button className="test-card-button">Take the test</Button>
        </div>

    )
}

export default TestItemCard