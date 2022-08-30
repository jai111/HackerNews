import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Views/LandingPage/LandingPage.js";
import NewsDetail from "./Views/NewsDetail/NewsDetail";

function App(){
    return(
        <Suspense fallback={(<div>Loading...</div>)}>
            <div style={{ paddingTop: '30px', minHeight: 'calc(100vh - 80px)' }}>
                <Routes>
                    <Route  path="/" element={<LandingPage/>} />
                    <Route path="/news/:newsId" element={<NewsDetail/>} />
                </Routes>
            </div>
        </Suspense> 
    )
}

export default App;