import { Container, Nav, Navbar } from "react-bootstrap";
import { FlashcardLinks } from "../data/FlashcardLinks";
import "../assets/styles/navbar.styles.css";
import "bootstrap/dist/css/bootstrap.css"

function FlashcardNavbar(){
    return <Navbar className="navbar-container">
        <Container>
            <Navbar.Brand className = "app-logo">Flashcard</Navbar.Brand>
            {
                FlashcardLinks.map((link) => {
                    return <Nav.Link href={link.link}>{link.description}</Nav.Link>
                })
            }
        </Container>
    </Navbar>
}

export default FlashcardNavbar