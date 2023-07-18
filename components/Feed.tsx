import { BookmarkIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

export default function Feed() {
  return (
    <div className="mx-auto max-w-5xl px-2 md:py-14 py-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person, index) => (
          <>
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4 relative group">
                <div className="overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <img
                  className="object-cover w-full rounded-lg h-60"
                  src={person.imageUrl}
                  alt=""
                />
                <div className="title absolute bottom-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-medium">{person.name}</h3>
                </div>
              </div>
              <div className="p-4 flex justify-between w-full items-center">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    className="h-7 w-7 rounded-full"
                    src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtd9M6KBOGZjnk94PFAEIGX-t7nDfWROVK17Mm8-ZMI%3Ds96-c&w=48&q=75"
                    alt=""
                  />
                  <h3 className="text-xl font-medium">{person.name}</h3>
                </div>
                <div className="flex space-x-4 cursor-pointer items-center">
                  <img
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                    className="h-5 w-5"
                    alt=""
                  />
                  <img
                    src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                    className="h-5 w-5"
                    alt=""
                  />
                </div>
              </div>
              <div className="px-4 pb-3 flex items-center w-full justify-between">
                <div className="flex space-x-3">
                  <BookmarkIcon className="w-5 h-5 cursor-pointer" />
                  <ShareIcon className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex">
                  <HeartIcon className="w-5 h-5 cursor-pointer" />
                  <span className="text-sm text-gray-600 ml-1">3</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
