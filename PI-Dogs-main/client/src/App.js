
import './App.css';
import { Routes, Route } from "react-router-dom";
import LeandingPage from './views/LeandingPage.jsx';
import HomePage from './views/HomePage.jsx';
import FormPage from './views/FormPage.jsx';
import DetailPage from './views/DetailPage.jsx';

function App() {
  return (
    <div className="App">

      <Routes>
        
        <Route path="/" element={<LeandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />

      </Routes>

    </div>
  );
}

export default App;
