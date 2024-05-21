import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  console.log(auth?.currentUser?.email);
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password..."
      />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};
export default Auth;
