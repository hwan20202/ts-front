import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MainHeader from "./services/MainHeader.jsx";
import Recipe from "./pages/Recipe.jsx";

function App() {
  return (
      <>
          <MainHeader />
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/recipe" element={<Recipe />} />
              </Routes>
          </Router>
      </>
  )
}

export default App
