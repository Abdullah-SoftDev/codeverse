"use client";
import { auth, db } from "@/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignInWithGithub, useSignInWithGoogle, useSignInWithTwitter } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const [signInWithTwitter, twitterUser, twitterLoading, twitterError] =
    useSignInWithTwitter(auth);
  const router = useRouter();

  const handleGoogleSignIn = () => {
    if (!googleLoading) {
      signInWithGoogle();
    }
  };

  const handleTwitterSignIn = () => {
    if (!twitterLoading) {
      signInWithTwitter();
    }
  };

  const handleGithubSignIn = () => {
    if (!githubLoading) {
      signInWithGithub();
    }
  };

  if (googleError || githubError || twitterError) {
    toast.error(
      googleError?.message || githubError?.message || twitterError?.message
    );
  }

  if (googleUser || githubUser || twitterUser) {
    router.push("/");
  }

  const createUserDocument = async (user: User) => {
    const docRef = doc(db, "users", user?.uid);
    await setDoc(docRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (googleUser) {
      createUserDocument(googleUser.user);
    } else if (githubUser) {
      createUserDocument(githubUser.user);
    } else if (twitterUser) {
      createUserDocument(twitterUser.user);
    }
  }, [googleUser, githubUser, twitterUser]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="antialiased bg-slate-200 pt-48 items-center justify-center px-4 min-h-screen">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
          <div className="my-5">
            <button
              onClick={handleGoogleSignIn}
              className={`w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 ${
                googleLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <img
                  src="https://www.svgrepo.com/show/442521/loader-1.svg"
                  className="animate-spin h-7 w-7 mr-3"
                  alt=""
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-6 h-6"
                  alt=""
                />
              )}
              <span>Login with Google</span>
            </button>
          </div>
          <div className="my-5">
            <button
              onClick={handleTwitterSignIn}
              className={`w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 ${
                twitterLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={twitterLoading}
            >
              {twitterLoading ? (
                <img
                  src="https://www.svgrepo.com/show/442521/loader-1.svg"
                  className="animate-spin h-7 w-7 mr-3"
                  alt=""
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                  className="w-6 h-6"
                  alt=""
                />
              )}
              <span>Login with Twitter</span>
            </button>
          </div>
          <div className="my-5">
            <button
              onClick={handleGithubSignIn}
              className={`w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 ${
                githubLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={githubLoading}
            >
              {githubLoading ? (
                <img
                  src="https://www.svgrepo.com/show/442521/loader-1.svg"
                  className="animate-spin h-7 w-7 mr-3"
                  alt=""
                />
              ) : (
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  className="w-6 h-6"
                  alt=""
                />
              )}
              <span>Login with Github</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
