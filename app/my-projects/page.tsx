"use client";
import Modal from "@/components/Modal";
import Postcard from "@/components/Postcard";
import { auth, db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { collection, getDocs, doc, WriteBatch, writeBatch, orderBy, query, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const page = () => {
  const [user] = useAuthState(auth);
  const [myProject, setMyProject] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const getMyProject = async (userId: string) => {
    setLoading(true);
    try {
      const snippetQuery = query(collection(db, `users/${userId}/posts`), orderBy("createdAt", "desc"));
      const snippetDocs = await getDocs(snippetQuery);
      const posts: PostData[] = snippetDocs.docs.map((doc) => {
        const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
        return {
          ...data,
        };
      });
      setMyProject(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Ensure that loading is set to false even if there's an error
    }
  };

  useEffect(() => {
    if (user) {
      getMyProject(user?.uid);
    }
  }, [user]);

  return (
    <Modal>
      {loading && <div className="pt-2 text-center text-red-500">Loading...</div>}
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
      <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl h-full md:text-4xl font-bold pb-1">
            Welcome to your personalised projects feed
        </h1>
        {/* ... (rest of the JSX) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 sm:pt-14">
          {myProject.map((post) => (
            <Postcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default page;