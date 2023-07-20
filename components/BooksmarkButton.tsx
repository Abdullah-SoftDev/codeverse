import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useBookmarkedPosts } from '@/context/bookmarkContext';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';

const BookmarkButton = ({ postId }: { postId: string }) => {
  const [user] = useAuthState(auth);
  const { removeBookmark, addBookmark } = useBookmarkedPosts();

  const [bookmarkDoc] = useDocument(
    doc(db, `users/${user?.uid}/bookmarks/${postId}`)
  );

  const handleAddBookmark = async (postId: string) => {
    await addBookmark(postId);
  };

  const handleRemoveBookmark = async (postId: string, user: string) => {
    await removeBookmark(postId, user);
  };

  return (
    <>
      {!bookmarkDoc?.exists() ? (
        <BookmarkIcon
          onClick={(e) => handleAddBookmark(postId)}
          className="w-5 h-5 text-gray-300 cursor-pointer"
        />
      ) : user ? (
        <img
          onClick={(e) => handleRemoveBookmark(postId, user.uid)}
          className="w-5 h-5 cursor-pointer"
          src="https://www.svgrepo.com/show/417756/saved.svg"
          alt="Remove Bookmark"
        />
      ) : null}
    </>
  );
};

export default BookmarkButton;
