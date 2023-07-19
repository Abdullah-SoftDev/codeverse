import { PostData } from '@/types/typescript.types'
import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import ShareButton from './ShareButton'
import { db } from '@/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { User } from 'firebase/auth'
const Postcard = async ({ postId, title, desc, websiteURL, twitterURL, githubURL, category, createdAt, images, creatorUid }: PostData) => {
    const ref = doc(db, 'users', creatorUid);
    const res = await getDoc(ref);
    const user = res.data() as User;
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 relative group">
                <div className="overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <img
                    className="object-cover w-full rounded-lg h-60"
                    src={images[0]}
                    alt=""
                />
                <div className="title absolute bottom-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-medium">{title}</h3>
                </div>
            </div>
            <div className="p-4 flex justify-between w-full items-center">
                <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                        className="h-7 w-7 rounded-full"
                        src={user?.photoURL!}
                        alt=""
                    />
                    <h3 className="text-xl font-medium">{user?.displayName}</h3>
                </div>
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
                    <BookmarkIcon className="w-5 h-5 cursor-pointer" />
                    <ShareButton title={title} desc={desc} />
                </div>
                <div className="flex">
                    <HeartIcon className="w-5 h-5 cursor-pointer" />
                    <span className="text-sm text-gray-600 ml-1">3</span>
                </div>
            </div>
        </div>
    )
}

export default Postcard