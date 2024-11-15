import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import MainHeader from "./services/MainHeader.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import NavBar from "./components/NavBar.jsx";
import IconButton from "./components/common/IconButton.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MainHeader />
          <AppContent />
        </UserProvider>
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
    <IconButton
      key="fourth"
      icon={<i className="fa-solid fa-user"></i>}
      onClick={() => redirect("/profile")}
      label="Profile"
    />,
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <NavBar buttons={buttons} />
    </>
  );
}

export default App;
