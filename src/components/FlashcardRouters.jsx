import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import TestList from "../pages/TestList"
import Test from "../pages/Test"
import FlashcardNavbar from "./FlashcardNavbar"
import TestUpload from "../pages/TestUpload"


function FlashcardRouter(){
    return(
        <BrowserRouter>
            <FlashcardNavbar/>
            <Routes>
                <Route index element ={ <Home/>} />
                <Route path="/test/list" element = {<TestList/>}/>
                <Route path="/test/current/" element = {<Test/>}/>
                <Route path="/test/upload" element = {<TestUpload/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default FlashcardRouter