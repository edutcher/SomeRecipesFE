import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import { ThemeProvider } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import NewRecipePage from "./pages/NewRecipePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import TopPage from "./pages/TopPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import { UserProvider } from "./contexts/UserContext";
import { lightTheme, darkTheme } from "./themes/themes";
import UseLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = UseLocalStorage("mode", "light");

  const handleThemeChange = (e) => {
    setDarkMode(!darkMode);
    if (mode === "light") setMode("dark");
    else setMode("light");
  };

  useEffect(() => {
    if (mode === "dark") setDarkMode(true);
  }, [mode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme() : lightTheme()}>
      <UserProvider>
        <CssBaseline />
        <BrowserRouter>
          <NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />
          <Switch>
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/account"
              render={() => (
                <AccountPage
                  handleThemeChange={handleThemeChange}
                  darkMode={darkMode}
                />
              )}
            />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/top" component={TopPage} />
            <Route exact path="/newrecipe" component={NewRecipePage} />
            <Route exact path="/recipe/:id" component={RecipePage} />
            <Route exact path="/category/:category" component={CategoryPage} />
            <Route exact path="/profile/:username" component={ProfilePage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}
