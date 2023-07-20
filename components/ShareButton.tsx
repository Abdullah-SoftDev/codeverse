import { ShareIcon } from '@heroicons/react/24/outline';

const ShareButton = ({ title, creatorUid, postId }: { title: string, creatorUid: string, postId: string }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                text: `${title}`,
                url: `https://codeverse-flax.vercel.app/project/${postId}?creatorUid=${creatorUid}`,
                // text: `${title} - ${desc}`, // Combine title and description in the text property
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
