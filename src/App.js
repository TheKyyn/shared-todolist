import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  useNavigate,
} from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useState } from "react";
import Todolist from "./components/Todolist";
import ShareTodolist from "./components/ShareTodolists";

function AuthHandler() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  if (user) {
    return (
      <>
        <p>Bonjour, {user.email}</p>
        <button onClick={handleSignOut}>Déconnexion</button>
        <Todolist />
        <ShareTodolist />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      {/* <Redirect to="/signin" /> */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthHandler />
    </Router>
  );
}

export default App;
