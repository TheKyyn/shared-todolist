import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";

//Composant qui gère l'ajout d'autres users à une todolist via leur email

function ShareTodolist() {
  const [email, setEmail] = useState("");

  const shareWithUser = async () => {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userSnapshot.empty) {
      const userId = userSnapshot.docs[0].id;
      await db
        .collection("todolists")
        .doc("yourTodolistId")
        .update({
          users: firebase.firestore.FieldValue.arrayUnion(userId),
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
