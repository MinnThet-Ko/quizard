
import "../assets/styles/test-item-card.styles.css"
import { useNavigate } from "react-router-dom"
import db from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

function TestItemCard({ test }) {
    const navigator = useNavigate();
    const handleTakeTestClick = (e) => {
        console.log(test)
        let path = "/test/" + test.test_id;
        navigator(path)
    }

    const handleDeleteTestClick = async (e) => {
        console.log(test.test_id)
        await deleteDoc(doc(db, "tests", test.test_id)).then((r) => {window.location.reload(false);})
    }

    return (
        <div className="test-item-card">
            <div className="test-card-title">{test.test_name}</div>
            <div>
                <button className="test-card-button test-card-take-button" onClick={handleTakeTestClick}>Take quiz</button>
                <button className="test-card-button test-card-delete-button" onClick={handleDeleteTestClick}>Delete quiz</button>
            </div>
            
        </div>

    )
}

export default TestItemCard