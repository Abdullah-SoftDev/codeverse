import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import Postcard from "./Postcard";


export default async function Feed() {
  const LIMIT = 5;
  const snippetQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const snippetDocs = await getDocs(snippetQuery);
  let posts: PostData[] = snippetDocs.docs.map((doc) => {
    const data = doc.data() as PostData; // Explicitly cast doc.data() as PostData
    return {
      ...data,
    };
  })

  return (
    <div className="mx-auto max-w-5xl px-2 md:py-14 py-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <>
          {posts.map((post) => (
            <Postcard key={post.postId} {...post} />
          ))}
        </>
      </div>
    </div>
  )
}
