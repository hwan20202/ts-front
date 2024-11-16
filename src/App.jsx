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
import RecipeFooter from "./components/footer/RecipeFooter.jsx";
import RecipeEdit from "./pages/RecipeEdit.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
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
              path="/recipe"
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
            <Route path="/login" element={<Login />} />
          </Routes>
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
      <RecipeFooter />
    </>
  );
};

const RecipeEditLayout = ({ children }) => {
  return (
    <>
      <RecipeHeader />
      {children}
      <RecipeFooter editMode={true} />
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
      <MainHeader />
      {children}
      <NavBar buttons={buttons} />
    </>
  );
};

// function AppContent() {

//   return (
//     <>
//       <Routes>
//         {/* 로그인 페이지 */}
//         <Route path="/login" element={<Login />} />
//         {/* 레시피 페이지 */}
//         <Route path="/recipe" element={<RecipePage />} />
//         {/* --- header 및 네비게이션 바 포함 --- */}
//         {/* 홈 페이지 */}
//         <Route path="/" element={<Home />} />
//         {/* 프로필 페이지 */}
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//       <NavBar buttons={buttons} />
//     </>
//   );
// }

export default App;
