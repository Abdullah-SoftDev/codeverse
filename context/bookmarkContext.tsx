'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDocs, collection, doc, getDoc, DocumentData, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

// Define the context type
type BookmarkedPostsContextType = {
  bookmarkedPosts: DocumentData[];
  fetchBookmarkedPosts: (user: any) => Promise<DocumentData[]>;
  removeBookmark: (postId: string, user: any) => Promise<void>;
};

// Create the initial context
const BookmarkedPostsContext = createContext<BookmarkedPostsContextType>({
  bookmarkedPosts: [],
  fetchBookmarkedPosts: async () => [],
  removeBookmark: async () => {},
});

// Create a helper function to fetch bookmarked posts
const fetchBookmarkedPosts = async (user: any): Promise<DocumentData[]> => {
  if (user) {
    // Fetch the bookmarked post IDs for the current user
    const bookmarkedPostsRef = collection(db, `users/${user.uid}/bookmarks`);
    const snapshot = await getDocs(bookmarkedPostsRef);
    const bookmarkedIds = snapshot.docs.map((doc) => doc.id);

    // Fetch details of each bookmarked post
    const bookmarkedPostsDetails = await Promise.all(
      bookmarkedIds.map(async (postId) => {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();

        // Add a check to ensure the data is not undefined before returning
        if (postData) {
          return postData;
        }

        // Handle the case when the document is not found or doesn't contain data
        // You can return null or an empty object based on your requirements
        return null;
      })
    );

    // Filter out any undefined values in the array
    return bookmarkedPostsDetails.filter((data) => data !== null) as DocumentData[];
  }

  return [];
};

// Create the Context Provider component
const BookmarkedPostsProvider = ({ children }:any) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<DocumentData[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchAndSetBookmarkedPosts = async () => {
      const bookmarkedPostsDetails = await fetchBookmarkedPosts(user);
      setBookmarkedPosts(bookmarkedPostsDetails);
    };

    fetchAndSetBookmarkedPosts();
  }, [user]);

  const removeBookmark = async (postId: string, user: any) => {
    if (!user || !postId) {
      return;
    }
    const userPostHeartRef = doc(db, `users/${user}/bookmarks/${postId}`);
    try {
      await deleteDoc(userPostHeartRef);
      // After removing the bookmark, fetch and update the bookmarkedPosts state
      const updatedBookmarkedPosts = bookmarkedPosts.filter(
        (post) => post.postId !== postId
      );
      setBookmarkedPosts(updatedBookmarkedPosts);
    } catch (error) {
      alert("Remove Heart Error: " + error);
    }
  };

  return (
    <BookmarkedPostsContext.Provider value={{ bookmarkedPosts, fetchBookmarkedPosts, removeBookmark }}>
      {children}
    </BookmarkedPostsContext.Provider>
  );
};

// Custom hook to access the context
const useBookmarkedPosts = () => useContext(BookmarkedPostsContext);

export { BookmarkedPostsProvider, useBookmarkedPosts };