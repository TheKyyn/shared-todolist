import React, { useState } from "react";
import { db, auth } from "../firebase";
import { arrayUnion } from "firebase/firestore";
import {
  collection,
  where,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

//Composant qui gère l'ajout d'autres users à une todolist via leur email

function ShareTodolist() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let todolistId;
  let todolistDocRef;

  if (auth.currentUser) {
    todolistId = auth.currentUser.uid;
    todolistDocRef = doc(db, "todolists", todolistId);
  } else {
    setErrorMessage("Vous devez être connecté pour partager votre todolist.");
  }

  const shareWithUser = async () => {
    if (!todolistDocRef) {
      console.error("Aucune référence à la todolist trouvée.");
      return;
    }

    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const userSnapshot = await getDocs(q);

    if (!userSnapshot.empty) {
      const userId = userSnapshot.docs[0].id;
      await updateDoc(todolistDocRef, {
        users: arrayUnion(userId),
      });
      setEmail("");
    } else {
      console.error("Aucun utilisateur trouvé avec cet e-mail.");
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez l'e-mail de l'utilisateur"
      />
      <button onClick={shareWithUser}>Partager avec cet utilisateur</button>
    </div>
  );
}

export default ShareTodolist;
