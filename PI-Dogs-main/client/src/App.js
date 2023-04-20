
import './App.css';
import { Routes, Route } from "react-router-dom";
import LeandingPage from './views/LeandingPage.jsx';
import HomePage from './views/HomePage.jsx';
import FormPage from './views/FormPage.jsx';
import DetailPage from './views/DetailPage.jsx';
import AboutPage from './views/AboutPage';

import Nav from './components/Nav';

function App() {
  return (
    <div className="App">

      <Nav/>

      <Routes>
        
        <Route path="/" element={<LeandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>

    </div>
  );
}

export default App;
