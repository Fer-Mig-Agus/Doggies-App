
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import LeandingPage from './views/LeandingPage.jsx';
import HomePage from './views/HomePage.jsx';
import FormPage from './views/FormPage.jsx';
import DetailPage from './views/DetailPage.jsx';
import AboutPage from './views/AboutPage';
import Nav from './components/Nav';
import ErrorPage from './views/ErrorPage';

function App() {

  const {pathname}=useLocation();

  const verificarRuta = () => {

    switch (pathname) {
      case "/": return false
      case "/home": return true
      case "/about": return true
      case "/detail/:id": return false
      case "/form": return true
      default: return false;
    }
  }


  return (
    <div className="App">
      
      {verificarRuta() && <Nav />}

      <Routes>
        
        <Route path="/" element={<LeandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="//detail/:id" element={<DetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>

    </div>
  );
}

export default App;
