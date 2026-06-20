import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuthClient } from "@/lib/firebase";

export async function login(email: string, password: string) {
  const auth = getAuthClient();
  if (!auth) {
    throw new Error("Firebase Auth not available");
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  const auth = getAuthClient();
  if (!auth) {
    return;
  }

  return signOut(auth);
}
