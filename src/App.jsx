import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MainHeader from "./services/MainHeader.jsx";
import Recipe from "./pages/Recipe.jsx";
import NavBar from "./components/NavBar.jsx";
import IconButton from "./components/IconButton.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainHeader />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const redirect = (path) => {
    console.log(`move to ${path}`);
    navigate(path);
  };

  const buttons = [
    <IconButton
      key="first"
      icon={<i className="fa-solid fa-house"></i>}
      onClick={() => redirect("/")}
      label="Home"
    />,
    <IconButton
      key="third"
      icon={<i className="fa-solid fa-book"></i>}
      onClick={() => redirect("/recipe")}
      label="Recipe"
    />,
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
      <NavBar buttons={buttons} />
    </>
  );
}

export default App;
