import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import MainHeader from "./components/header/MainHeader.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import IconButton from "./components/common/IconButton.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import RecipeProvider from "./context/RecipeProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import RecipeHeader from "./components/header/RecipeHeader.jsx";
import RecipeEdit from "./pages/RecipeEdit.jsx";
import RecipeEditHeader from "./components/header/RecipeEditHeader.jsx";
import InitialUserInfoProvider from "./context/InitialUserInfoProvider.jsx";
import PreferenceInit from "./components/userInfo/preference/PreferenceInit.jsx";
import DislikedAndAllergyInit from "./components/userInfo/dislikedAndAllergy/DislikedAndAllergyInit.jsx";
import HealthInfoInit from "./components/userInfo/health/HealthInfoInit.jsx";
import RecipeLoading from "./pages/RecipeLoading.jsx";
import RecipeFooter from "./components/footer/RecipeFooter.jsx";
import { useAuth } from "./context/AuthProvider.jsx";
import Header from "./components/header/Header.jsx";
const Page = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-white p-36">
      {children}
    </div>
  );
};

function MainWrapper() {
  return (
    <AuthProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </AuthProvider>
  );
}
function RecipeWrapper() {
  return (
    <RecipeProvider>
      <Outlet />
    </RecipeProvider>
  );
}

function InitUserInfoWrapper() {
  return (
    <InitialUserInfoProvider>
      <Page>
        <Outlet />
      </Page>
    </InitialUserInfoProvider>
  );
}

function ConditionalRecipeLayout({ children }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === null) {
    return <RecipeLoading />;
  }
  return isLoggedIn ? (
    <RecipeLayout>{children}</RecipeLayout>
  ) : (
    <SharedOnlyRecipeLayout>{children}</SharedOnlyRecipeLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loading" element={<RecipeLoading />} />

        {/* <Route
          path="/recipe/share/:recipeId"
          element={
            <RecipeLayout>
              <RecipePage />
            </RecipeLayout>
          }
        /> */}
        <Route path="/" element={<MainWrapper />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
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
          <Route path="/user/init" element={<InitUserInfoWrapper />}>
            <Route path="/user/init/health" element={<HealthInfoInit />} />
            <Route path="/user/init/preference" element={<PreferenceInit />} />
            {/* <Route
              path="/user/init/dislikedAndAllergy"
              element={<DislikedAndAllergyInit />}
            /> */}
          </Route>
          <Route path="/recipe" element={<RecipeWrapper />}>
            <Route
              // tag: [original, custom]
              path="/recipe/:tag/:recipeId"
              element={
                // <RecipeLayout>
                //   <RecipePage />
                // </RecipeLayout>
                <ConditionalRecipeLayout>
                  <RecipePage />
                </ConditionalRecipeLayout>
              }
            />
            <Route
              // type: [user, generate, nutrition, simplify]
              path="/recipe/:type/:recipeId/edit"
              element={
                <RecipeEditLayout>
                  <RecipeEdit />
                </RecipeEditLayout>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

const SharedOnlyRecipeHeader = () => {
  return <Header>SharedRecipeHeader</Header>;
};

const SharedOnlyRecipeFooter = () => {
  return <div>SharedRecipeFooter</div>;
};

const SharedOnlyRecipeLayout = ({ children }) => {
  return (
    <>
      <SharedOnlyRecipeHeader />
      {children}
      <SharedOnlyRecipeFooter />
    </>
  );
};

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
      <RecipeEditHeader />
      {children}
    </>
  );
};

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const redirect = (path) => {
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
      icon={<i className="fa-solid fa-user"></i>}
      onClick={() => redirect("/profile")}
      label="Profile"
    />,
  ];

  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};

export default App;
