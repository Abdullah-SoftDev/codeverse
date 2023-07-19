import { Timestamp } from "firebase/firestore";

export type PostForm = {
    title: string,
    desc: string,
    websiteURL: string,
    twitterURL: string,
    githubURL: string,
    category: string,
    createdAt?: Timestamp;
    images: (string | File)[];
  };