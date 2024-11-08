
import "../assets/styles/test-item-card.styles.css"
import { useNavigate } from "react-router-dom"

function TestItemCard({ test }) {
    const navigator = useNavigate();
    const handleTakeTestClick = (e) => {
        console.log(test)
        let path = "/test/" + test.test_id;
        navigator(path)
    }
    return (
        <div className="test-item-card">
            <div className="test-card-title">{test.test_name}</div>
            <button className="test-card-button" onClick={handleTakeTestClick}>Take quiz</button>
        </div>

    )
}

export default TestItemCard