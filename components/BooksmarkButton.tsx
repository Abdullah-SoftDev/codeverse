import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useBookmarkedPosts } from '@/context/bookmarkContext';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';

const BookmarkButton = ({ postId }: { postId: string }) => {
  const [user] = useAuthState(auth);
  const { removeBookmark } = useBookmarkedPosts();

  const [bookmarkDoc] = useDocument(
    doc(db, `users/${user?.uid}/bookmarks/${postId}`)
  );

  const addBookmark = async (postId: string) => {
    if (!user || !postId) {
      return;
    }
    const userPostHeartRef = doc(db, `users/${user.uid}/bookmarks/${postId}`);
    try {
      await setDoc(userPostHeartRef, { postId: postId });
    } catch (error) {
      alert("Add Heart Error: " + error);
    }
  };

  const handleRemoveBookmark = async (postId: string, user: string) => {
    await removeBookmark(postId, user);
  };

  return (
    <>
      {!bookmarkDoc?.exists() ? (
        <BookmarkIcon
          onClick={(e) => addBookmark(postId)}
          className="w-5 h-5 text-gray-300 cursor-pointer"
        />
      ) : user ? (
        <BookmarkIcon
          onClick={(e) => handleRemoveBookmark(postId, user.uid)}
          className="w-5 h-5 text-rose-500 cursor-pointer"
        />
      ) : null}
    </>
  );
};

export default BookmarkButton;