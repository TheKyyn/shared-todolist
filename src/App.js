import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "/components/SignUp";
import SignIn from "/components/SignIn";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useState } from "react";

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
            {/* Ajouter ici que les composants et routes qui seront accessibles uniquement aux users connectés */}
          </>
        ) : (
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
