'use client'
import { ShareIcon } from '@heroicons/react/24/outline';
import React from 'react'

const ShareButton = ({ title, }: { title: string}) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // fallback for browsers that don't support the Web Share API
            alert("No support in your browser")
        }
    };
    return (
        <ShareIcon onClick={handleShare} className="w-5 h-5 cursor-pointer" />
    )
}

export default ShareButton
