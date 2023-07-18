'use client'
import { auth } from "@/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  console.log(user)
  return (
    <p className="text-xl text-center bg-red-500 text-black p-5">
      Lets start building.🔥
    </p>
  )
}
