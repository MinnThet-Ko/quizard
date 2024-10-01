import { Button } from "react-bootstrap"
import FileUpload from "../components/FileUpload"

function Home() {
    return (<>
    <Button>
        Create a new test
    </Button>
    <Button>
        Show all tests
    </Button>
    <FileUpload/>
    </>)
}

export default Home