import Modal from "@/components/Modal";
import { db } from "@/firebase/firebaseConfig";
import { PostData } from "@/types/typescript.types";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import Link from "next/link";

const Page = async ({ params,searchParams  }: { params: { projectId: string , creatorUid:string} ,   searchParams: { creatorUid?: string | string[] | undefined };
}) => {
    const { projectId } = params; // Extracting postId from params object
    const { creatorUid } = searchParams; // Extracting postId from params object
    const docSnapshot = await getDoc(doc(db, "posts", projectId)); // Retrieving document snapshot for the specified postId
    const data = docSnapshot.data() as PostData; // Explicitly cast doc.data() as PostData
    
    const ref = doc(db, `users/${creatorUid}`);
    const res = await getDoc(ref);
        const userData = res.data() as DocumentData;
    return (
     <Modal>
     <div className=" py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              {data.category}
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
             {data.title}
            </span>
          </h1>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <figure>
            <img
              className="w-full rounded-lg"
              src={data.images[0]}
              width={1310}
              height={873}
            />
           <figure className="flex space-x-2 py-2 items-center">
           <img
                        className="h-10 w-10 rounded-full"
                        src={userData?.photoURL}
                        alt=""
                      />
        <figcaption className="text-gray-600 mt-2 font-medium">{userData.displayName}</figcaption>
    </figure>
          </figure>
          <p>
         {data.desc}
          </p>
        </div>
        <div className="flex justify-center space-x-6 mt-6">
      <Link target="_blank" href={data.websiteURL}
        className="sm:ml-6 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
          Live Url🚀
      </Link>
      <Link target="_blank" href={data.githubURL}
      className="sm:ml-6 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none">
          Github Url
      </Link>
    </div>
      </div>
    </div>
     </Modal>
    )
  }

  export default Page