import { auth, db } from "@/firebase/firebaseConfig";
import { HeartButtonProps } from "@/types/typescript.types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { WriteBatch, doc, increment, writeBatch } from "firebase/firestore";
import React, { FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const HeartButton = ({
  postId,
  dbLike,
  setDbLike,
  creatorUid,
}: HeartButtonProps) => {
  const [user] = useAuthState(auth);
  const [heartDoc] = useDocument(
    doc(db, `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`)
  );

  const addHeart = async (e: FormEvent) => {
    e.preventDefault();
    const userPostHeartRef = doc(
      db,
      `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`
    );
    const userPostRef = doc(db, `users/${creatorUid}/posts/${postId}`);
    const postRef = doc(db, `posts/${postId}`);
    try {
      const batch: WriteBatch = writeBatch(db);
      batch.update(postRef, { like: increment(1) });
      batch.update(userPostRef, { like: increment(1) });
      batch.set(userPostHeartRef, { uid: user?.uid });
      await batch.commit();
      setDbLike((prevCount: number) => prevCount + 1);
    } catch (error) {
      alert("Add Heart Error" + error);
    }
  };

  const removeHeart = async (e: FormEvent) => {
    e.preventDefault();
    const userPostHeartRef = doc(
      db,
      `users/${creatorUid}/posts/${postId}/hearts/${user?.uid}`
    );
    const userPostRef = doc(db, `users/${creatorUid}/posts/${postId}`);
    const postRef = doc(db, `posts/${postId}`);
    try {
      const batch: WriteBatch = writeBatch(db);
      batch.update(postRef, { like: increment(-1) });
      batch.update(userPostRef, { like: increment(-1) });
      batch.delete(userPostHeartRef);
      await batch.commit();
      setDbLike((prevCount: number) => prevCount - 1);
    } catch (error) {
      alert("Remove Heart Error" + error);
    }
  };

  return (
    <div className="flex">
      {!heartDoc?.exists() ? (
        <HeartIcon
          onClick={addHeart}
          className="w-5 h-5 text-gray-300 cursor-pointer"
        />
      ) : (
        <HeartIcon
          onClick={removeHeart}
          className="w-5 h-5 text-rose-500 cursor-pointer"
        />
      )}
      <span className="text-sm text-gray-600 ml-1">{dbLike}</span>
    </div>
  );
};

export default HeartButton;
