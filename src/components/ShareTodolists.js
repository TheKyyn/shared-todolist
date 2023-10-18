import React, { useState } from "react";
import { db } from "../firebase";
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

  const shareWithUser = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const userSnapshot = await getDocs(q);

    if (!userSnapshot.empty) {
      const userId = userSnapshot.docs[0].id;
      const todolistDocRef = doc(db, "todolists", "yourTodolistId");
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
