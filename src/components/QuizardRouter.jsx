import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import TestList from "../pages/TestList"
import Test from "../pages/Test"
import QuizardNavbar from "./QuizardNavbar"
import TestUpload from "../pages/TestUpload"


function QuizardRouter(){
    return(
        <BrowserRouter>
            <QuizardNavbar/>
            <Routes>
                <Route index element ={ <Home/>} />
                <Route path="/test/list" element = {<TestList/>}/>
                <Route path="/test/:testId" element = {<Test/>}/>
                <Route path="/test/upload" element = {<TestUpload/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default QuizardRouter