import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Standings from "./pages/Standings";

const App: React.FC = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <nav className="flex space-x-4 mb-4">
                    <a href="/" className="font-semibold">Home</a>
                    <a href="/standings" className="font-semibold">Standings</a>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/standings" element={<Standings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

