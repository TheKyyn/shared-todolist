import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "/components/SignUp";
import SignIn from "/components/SignIn";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useState } from "react";
import Todolist from "./components/Todolist";
import ShareTodolist from "./components/ShareTodolists";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // On se désabonne du l'écouteur lors du nettoyage
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <Router>
      <div>
        {user ? (
          <>
            <p>Bonjour, {user.email}</p>
            <button onClick={handleSignOut}>Déconnexion</button>
            <Todolist />
            <ShareTodolist />
            {/* Ajouter ici que les composants et routes qui seront accessibles uniquement aux users connectés */}
          </>
        ) : (
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Redirect to="/signin" />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
