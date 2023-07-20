"use client";

import { auth, db, storage } from "@/firebase/firebaseConfig";
import { PostData, PostForm } from "@/types/typescript.types";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { doc, collection, Timestamp, WriteBatch, serverTimestamp, writeBatch } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const categories = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-Commerce",
  "Chatbots",
];

const Form = ({ title, desc, postId, websiteURL, githubURL, twitterURL, category, images }: any) => {
  const [selected, setSelected] = useState(category || categories[2]);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<PostForm>({
    images: images || [],
    title: title || "",
    desc: desc || "",
    websiteURL: websiteURL || "",
    twitterURL: twitterURL || "",
    githubURL: githubURL || "",
    category: category || selected,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPost((post) => ({
      ...post,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setSelected( value); // Update the selected value
    setPost((post) => ({
      ...post,
      category: value, // Update the category field in the post state
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setPost((post) => ({
        ...post,
        images: fileArray,
      }));
    }
  };

  const downloadURLs: string[] = [];
  const handleSubmitImage = async () => {
    const storageRef = ref(
      storage,
      `images/${user?.uid}/${Timestamp.now().seconds}/`
    );

    try {
      for (let i = 0; i < post.images.length; i++) {
        const file = post.images[i];
        const filePath = `${storageRef.fullPath}/${(file as File).name}`;

        await uploadBytes(ref(storage, filePath), file as Blob);

        const fileRef = ref(storage, filePath);
        const downloadURL = await getDownloadURL(fileRef);

        downloadURLs.push(downloadURL);
      }
    } catch (error) {
      alert("Error occurred while uploading images: " + error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { images, title, desc, websiteURL, twitterURL, githubURL, category } =
      post;
    if (
      !title ||
      !category ||
      !websiteURL ||
      !githubURL ||
      !desc ||
      !twitterURL ||
      !images
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const postId = doc(collection(db, "ids")).id;

    const userPostRef = doc(db, `users/${user?.uid}/posts`, postId);
    const generalPostRef = doc(db, "posts", postId);

    try {
      setLoading(true);

      await handleSubmitImage();
      const batch: WriteBatch = writeBatch(db);
      const newpost = {
        postId,
        creatorUid: user?.uid,
        images: downloadURLs,
        title,
        desc,
        websiteURL,
        twitterURL,
        githubURL,
        category,
        createdAt: serverTimestamp() as Timestamp,
        like: 0,
      };
      batch.set(userPostRef, newpost);
      batch.set(generalPostRef, newpost);
      await batch.commit();
      setPost({
        images: [],
        title: "",
        desc: "",
        websiteURL: "",
        twitterURL: "",
        githubURL: "",
        category: "",
      });

      setLoading(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      setLoading(false);
      alert("Error occurred while submitting the form: " + error);
    }
  };

  const handleImageClick = (index: number) => {
    setPost((post) => {
      const updatedImages = [...post.images];
      updatedImages.splice(index, 1);
      return {
        ...post,
        images: updatedImages,
      };
    });
  };

  const handleUpdatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (user && postId) {
      const userPostRef = doc(db, `users/${user?.uid}/posts`, postId);
      const generalPostRef = doc(db, "posts", postId);
      setLoading(true);
      try {
        // Create a batch write operation for atomicity
     {images && await handleSubmitImage();}
        const batch: WriteBatch = writeBatch(db);
        const updatedSnippet = {
          images: downloadURLs,
          title: post.title,
          desc: post.desc,
          websiteURL: post.websiteURL,
          twitterURL: post.twitterURL,
          githubURL: post.githubURL,
          category: post.category,
        };
        // Update the prompt in the user's post collection and the general post collection
        batch.update(userPostRef, updatedSnippet);
        batch.update(generalPostRef, updatedSnippet);
        // Commit the batch write operation
        await batch.commit();
        // Reset the create prompt form fields
        setPost({
          images: [],
          title: "",
          desc: "",
          websiteURL: "",
          twitterURL: "",
          githubURL: "",
          category: "",
        });
        // Navigate to the my prompts page
        router.push("/my-projects");
      } catch (error) {
        // Handle errors during form submission
        alert("Error occurred while updating the project: " + error);
      }
      // Set the loading state back to false
      setLoading(false);
    }
  };

  // Cancel form submission
  const handelCancel = () => {
    setPost({
      images: [],
      title: "",
      desc: "",
      websiteURL: "",
      twitterURL: "",
      githubURL: "",
      category: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl px-4 lg:px-0 md:py-6 py-4"
    >
      <div className="py-14 space-y-6">
        <div>
          <label
            htmlFor="fileUpload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose images for your project{" "}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
  {post.images.length > 0 ? (
    <div className="space-y-1 text-center max-w-sm">
      {post.images.map((file, index) => (
        <p
          className="cursor-pointer truncate"
          key={index}
          onClick={() => handleImageClick(index)}
        >
          {typeof file === "string" ? file : (file as File).name}
        </p>
      ))}
    </div>
  ) : (
    <div className="space-y-1 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        {/* SVG path */}
      </svg>
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="fileUpload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Upload a file</span>
          <input
            onChange={handleImageChange}
            id="fileUpload"
            name="fileUpload"
            type="file"
            className="sr-only"
            multiple
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )}
</div>

        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Title{" "}
          </label>
          <div className="mt-2">
            <input
            value={post.title}
              onChange={handleInputChange}
              type="text"
              name="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description{" "}
          </label>
          <div className="mt-2">
            <input
            value={post.desc}
              onChange={handleInputChange}
              type="text"
              name="desc"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Website URL
          </label>
          <div className="mt-2">
            <input
            value={post.websiteURL}
              onChange={handleInputChange}
              name="websiteURL"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Twitter URL{" "}
          </label>
          <div className="mt-2">
            <input
            value={post.twitterURL}
              onChange={handleInputChange}
              type="text"
              name="twitterURL"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            GitHub URL{" "}
          </label>
          <div className="mt-2">
            <input
            value={post.githubURL}
              onChange={handleInputChange}
              type="text"
              name="githubURL"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <Listbox value={selected} onChange={handleCategoryChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                Categories
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{selected}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categories.map((category) => (
                      <Listbox.Option
                        key={category}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        value={category}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } ml-3 block truncate`}
                              >
                                {category}
                              </span>
                            </div>

                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-indigo-600"
                                } absolute inset-y-0 right-0 flex items-center pr-4`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <div className="flex pt-5 items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={handelCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        {pathName === `/update-project/${postId}` && (
          <button
            onClick={handleUpdatePrompt}
            type="submit"
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading
                ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
                : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Upload"}
          </button>
        )}
        {pathName === `/upload-project` && (
          <button
            type="submit"
            className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading
                ? "opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
                : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Upload"}
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
