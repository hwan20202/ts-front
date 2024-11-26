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
import MainHeader from "./components/header/MainHeader.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import NavBar from "./components/NavBar.jsx";
import IconButton from "./components/common/IconButton.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import RecipeHeader from "./components/header/RecipeHeader.jsx";
import RecipeFooter from "./components/footer/RecipeEditFooter.jsx";
import RecipeEdit from "./pages/RecipeEdit.jsx";
import IngredientProvider from "./context/IngredientProvider.jsx";
import Research from "./pages/Research.jsx";
import RecipeEditHeader from "./components/header/RecipeEditHeader.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <IngredientProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/recipe/:recipeId"
                element={
                  <RecipeLayout>
                    <RecipePage />
                  </RecipeLayout>
                }
              />
              <Route
                path="/recipe/:recipeId/edit"
                element={
                  <RecipeEditLayout>
                    <RecipeEdit />
                  </RecipeEditLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                }
              />
              <Route path="/research" element={<Research />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </IngredientProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

const RecipeLayout = ({ children }) => {
  return (
    <>
      <RecipeHeader />
      {children}
    </>
  );
};

const RecipeEditLayout = ({ children }) => {
  return (
    <>
      <RecipeEditHeader />
      {children}
    </>
  );
};

const MainLayout = ({ children }) => {
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
      key="fourth"
      icon={<i className="fa-solid fa-user"></i>}
      onClick={() => redirect("/profile")}
      label="Profile"
    />,
  ];

  return (
    <>
      <MainHeader />
      {children}
      <NavBar buttons={buttons} />
    </>
  );
};

export default App;
