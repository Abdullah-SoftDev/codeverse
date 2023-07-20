import Postcard from "@/components/Postcard";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { collection, getDocs, query, where } from "firebase/firestore";

const page = async({ searchParams }: { searchParams: { category: string | string[] | undefined }}) => {
  const { category } = searchParams; // Extracting uid from params object
  const productsRef = collection(db, 'posts');
  const querySnapshot = await getDocs(query(productsRef, where('category', '==', category)));
  const posts: PostData[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    } as PostData;
  });  
  return (
    <>
      <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
        {posts.length === 0 && <p className="text-red-500 text-center text-3xl">No result found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Postcard key={post.postId} {...post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default page