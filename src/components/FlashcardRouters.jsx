import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import TestList from "../pages/TestList"
import Test from "../pages/Test"

function FlashcardRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element ={ <Home/>} />
                <Route path="/test/list" element = {<TestList/>}/>
                <Route path="/test/current/" element = {<Test/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default FlashcardRouter