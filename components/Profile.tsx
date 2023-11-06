import { ChangeEvent, useState, useRef, RefObject } from "react";
import { BsImage } from "react-icons/bs";
import { motion } from "framer-motion";
import { UserProps } from "../pages/index";

interface ProfileProps {
  user: UserProps;
  overrideUser: (newUser: UserProps, ref: RefObject<HTMLDivElement>) => void;
}

export const Profile = ({ user, overrideUser }: ProfileProps) => {
  const [stagedUser, setStagedUser] = useState<UserProps>(user);
  const fileRef = useRef<HTMLInputElement>(null);
  const personalInfoRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/jfif")
    ) {
      setStagedUser({ ...stagedUser, imgPath: URL.createObjectURL(file) });
    } else {
      console.log("Invalid file type");
    }
  };

  const updateFirstName = (newFirstName: string) => {
    setStagedUser({ ...stagedUser, firstname: newFirstName });
  };

  const updateLastName = (newLastName: string) => {
    setStagedUser({ ...stagedUser, lastname: newLastName });
  };

  const updateEmail = (newEmail: string) => {
    setStagedUser({ ...stagedUser, email: newEmail });
  };

  return (
    <div className="relative col-span-3 rounded-2xl bg-white">
      <div className="p-12">
        <h2 className="text-2xl mb-2 font-semibold tracking-tighter">
          Profile Details
        </h2>
        <p className="text-gray-600">
          Add your details to create a personal touch to your profile.
        </p>
        <section
          id="image-section"
          className="grid grid-cols-3 items-center mt-10 p-4 bg-gray-100 rounded-md"
        >
          <p className="text-gray-600">Profile picture</p>
          <button
            id="profile-image-btn"
            onClick={() => fileRef.current.click()}
            style={{ backgroundImage: `url(${stagedUser.imgPath})` }}
            className="w-44 h-44 bg-cover bg-center rounded-lg"
          >
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              id="profile-image"
              className="hidden w-full h-full text-white bg-gray-600 opacity-80 rounded-lg"
            >
              <BsImage className="w-8 h-8 m-auto" />
              <span className="text-sm">Change Image</span>
            </div>
          </button>
          <div className="text-xs text-gray-500">
            <p>Image must be below 1024x1024px.</p>
            <p>Use .PNG, .JPG and .JPEG formats</p>
          </div>
        </section>

        <section
          ref={personalInfoRef}
          id="personal-info"
          className="mt-10 p-4 bg-gray-100 rounded-md border-2 border-transparent"
        >
          <form>
            <div className="flex justify-between items-center">
              <label htmlFor="first-name" className="text-gray-600">
                First name*
              </label>
              <input
                type="text"
                id="first-name"
                className="w-80 p-2 mt-1 rounded-md border-2 focus:border-green-500 outline-none"
                onChange={(e) => updateFirstName(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="last-name" className="text-gray-600">
                Last name*
              </label>
              <input
                type="text"
                id="last-name"
                className="w-80 p-2 mt-1 rounded-md border-2 focus:border-green-500 outline-none"
                onChange={(e) => updateLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="email" className="text-gray-600">
                Email*
              </label>
              <input
                type="email"
                id="email"
                className="w-80 p-2 mt-1 rounded-md border-2 focus:border-green-500 outline-none"
                onChange={(e) => updateEmail(e.target.value)}
              />
            </div>
          </form>
        </section>
      </div>
      <div
        id="dashboard-bottom-div"
        className="absolute bottom-0 bg-gray-100 w-full h-20 flex justify-end items-center px-10 rounded-b-3xl"
      >
        <motion.button
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
          onClick={() => overrideUser(stagedUser, personalInfoRef)}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};
