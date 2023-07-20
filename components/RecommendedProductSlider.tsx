import { db } from '@/firebase/firebaseConfig';
import { PostData } from '@/types/typescript.types';
import { collection, getDocs, query } from 'firebase/firestore';
import Link from 'next/link';
import Postcard from './Postcard';

const RecommendedProductSlider = async ({ creatorUid, projectId }: { projectId: string, creatorUid?: string | string[] }) => {
    const q = query(collection(db, `users/${creatorUid}/posts`));
    const querySnapshot = await getDocs(q);
    const fetchedProducts: PostData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            ...data,
        } as PostData;
    });

    // Assuming `slug` is defined elsewhere, use your own value for `slug`
    const filteredProducts = fetchedProducts.filter((product) => product.postId !== projectId);
    return (
        <div className="mx-auto max-w-5xl px-2 lg:px-0 py-14">
            <h2 className="text-center text-3xl">Recommended Projects⚡</h2>
            <div className="mt-8 relative">
                <div className="overflow-x-scroll scrollbar-hide">
                    <ul role="list" className="flex space-x-8">
                        {filteredProducts.map((post) => (
                            <li key={post.postId}>
                                <Postcard {...post} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RecommendedProductSlider