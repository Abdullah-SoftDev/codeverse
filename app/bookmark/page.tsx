'use client'
import Postcard from "@/components/Postcard";
import { useBookmarkedPosts } from "@/context/bookmarkContext";

const Bookmarks = () => {
    const { bookmarkedPosts } = useBookmarkedPosts();
    return (
      <>
        {/* <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
          <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl h-full md:text-4xl font-bold pb-1">
            My Bookmarks
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 sm:pt-14">
            {bookmarkedPosts.map((post:any) => (
              <Postcard key={post.postId} {...post} />
            ))}
          </div>
        </div> */}
            <div className="max-w-5xl mx-auto px-2 xl:px-0 pt-10 sm:pt-14 pb-14">
      <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl h-full md:text-4xl font-bold pb-1">
        My Bookmarks
      </h1>
      {bookmarkedPosts.length > 0 ? (
        // If there are bookmarked posts, display them here
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 sm:pt-14">
            {bookmarkedPosts.map((post:any) => (
              <Postcard key={post.postId} {...post} />
            ))}
          </div>
      ) : (
        // If there are no bookmarked posts, show the "No bookmarks" message
        <div className="text-center mt-4 text-gray-500">
          <p className="font-semibold">No bookmarks found.</p>
        </div>
      )}
    </div>

      </>
    );
  };
  
  export default Bookmarks;
  