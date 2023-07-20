"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

function classNames(...classes: string[]) {
  return classes?.filter(Boolean)?.join(" ");
}

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow sticky top-0 left-0 right-0 z-20">
      <div className="max-w-5xl mx-auto px-2 xl:px-0">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href='/' className="flex items-center">
              <img
                src='https://flexibble.vercel.app/logo.svg'
                width={116}
                height={43}
                alt='logo'
              />
            </Link>
            <div className="hidden lg:ml-5 lg:flex lg:space-x-8 pt-1">
              <Link
                href="/trending"
                className=" text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium"
              >
                Trending
              </Link>
              {user && (
                <Link
                  href="/upload-project"
                  className=" text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium"
                >
                  Upload project
                </Link>
              )}
              {user && (
                <Link
                  href="/my-projectscard
                  "
                  className=" text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium"
                >
                  My projects
                </Link>
              )}
              {user && (
                <Link
                  href="/bookmark"
                  className=" text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1  text-sm font-medium"
                >
                  My Bookmark
                </Link>
              )}
            </div>
          </div>

          {/* Profile dropdown */}
          <div className="md:ml-4 ml-2 flex items-center">
            {user ? (
              <Menu as="div" className="relative flex-shrink-0">
                <div>
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    {user && user?.photoURL && (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.photoURL ?? ""}
                        alt=""
                      />
                    )}
                    {user && user?.email && !user?.photoURL && (
                      <div className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full">
                        <p className="text-white text-xl font-medium">
                          {user?.email?.split("@")[0].charAt(0).toUpperCase()}
                        </p>
                      </div>
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/trending"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "px-4 py-2 text-sm text-gray-700 lg:hidden inline-flex w-full"
                          )}
                        >
                          Trending{" "}
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/upload-project"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "px-4 py-2 text-sm text-gray-700 lg:hidden inline-flex w-full"
                          )}
                        >
                          Create Project
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/my-projectscard
                          "
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "lg:hidden inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                          )}
                        >
                          My Projects
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                        href="/bookmark"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "lg:hidden inline-flex px-4 py-2 text-sm text-gray-700 w-full"
                        )}
                      >
                        My Bookmark
                      </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={async () => {
                            await signOut();
                          }}
                          className={classNames(
                            active ? "bg-gray-100 w-full text-left" : "",
                            "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="sm:ml-6 inline-flex items-center px-4 py-2 border  text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;