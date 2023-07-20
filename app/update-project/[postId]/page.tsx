import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Form from "@/components/Form";
import { PostData } from "@/types/typescript.types";
import Modal from "@/components/Modal";

const Page = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params; // Extracting postId from params object
  const docSnapshot = await getDoc(doc(db, "posts", postId)); // Retrieving document snapshot for the specified postId
  const data = docSnapshot.data() as PostData; // Explicitly cast doc.data() as PostData

  // Rendering the Form component with the data
  return <Modal>
     <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl md:text-4xl font-bold pt-4">
Update Project                </h1>
  <Form {...data} />
  </Modal>
};

export default Page;