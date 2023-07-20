'use client'
import { PostData } from '@/types/typescript.types'
import { BookmarkIcon, HeartIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ShareButton from './ShareButton'
import { db } from '@/firebase/firebaseConfig'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import HeartButton from './HeartButton'
import BooksmarkButton from './BooksmarkButton'
import { usePathname } from 'next/navigation'

const Postcard = ({ postId, title, desc, websiteURL, twitterURL, githubURL, category, createdAt, images, creatorUid, like }: PostData) => {
    const [dbUser, setDbUser] = useState<DocumentData>({});
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [dbLike, setDbLike] = useState(like);
    const pathName = usePathname();

    const getUser = async (userId: string) => {
        setLoading(true);
        const ref = doc(db, `users/${userId}`);
        const res = await getDoc(ref);
        if (res.exists()) {
            const userData = res.data() as DocumentData;
            setDbUser(userData);
        }
        setLoading(false);
    };
    useEffect(() => {
        if (creatorUid) {
            getUser(creatorUid);
        }
    }, [creatorUid]);

    return (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
  <Link href={`/project/${postId}/?creatorUid=${creatorUid}`}>
            <div className="aspect-w-3 aspect-h-4 relative group">
                <div className="overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <img
                    className="object-cover w-full rounded-lg h-60"
                    src={images[0]}
                    alt=""
                />
                <div className="absolute bottom-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-medium">{title}</h3>
                </div>
            </div>
            </Link>
            <div className="p-4 flex justify-between w-full items-center">
                {loading ?
                    <div className="animate-pulse">
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                            <div className="w-40 h-4 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                    : <div className="flex items-center space-x-2 cursor-pointer">
                        <img
                            className="h-7 w-7 rounded-full"
                            src={dbUser.photoURL!}
                            alt=""
                        />
                        <h3 className="text-xl font-medium">{dbUser?.displayName}</h3>
                    </div>}
                <div className="flex space-x-4 cursor-pointer items-center">
                    <Link target="_blank" href={githubURL}>
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            className="h-5 w-5"
                            alt=""
                        />
                    </Link>
                    <Link target="_blank" href={twitterURL}>
                        <img
                            src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                            className="h-5 w-5"
                            alt=""
                        />
                    </Link>
                </div>
            </div>
            <div className="px-4 pb-3 flex items-center w-full justify-between">
                <div className="flex space-x-3">
                    <BooksmarkButton
                        postId={postId}
                    />
                    <ShareButton title={title} creatorUid={creatorUid} postId={postId}/>
                    {pathName === "/my-projects" &&
                        <Link href={`/update-project/${postId}`}>
                            <PencilIcon className="w-5 h-5 cursor-pointer" />
                        </Link>
                    }
                </div>
                <HeartButton
                    postId={postId}
                    dbLike={dbLike}
                    setDbLike={setDbLike}
                    creatorUid={creatorUid}
                />
            </div>
        </div>
    )
}

export default Postcard