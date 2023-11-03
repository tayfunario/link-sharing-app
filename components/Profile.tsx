import { ChangeEvent, useState, useRef } from "react";
import { BsImage } from "react-icons/bs";
import { motion } from "framer-motion";

export const Profile = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/jfif")
    ) {
      setFileUrl(URL.createObjectURL(file));
    } else {
      console.log("Invalid file type");
    }
  };

  return (
    <div className="col-span-3 rounded-2xl bg-white">
      <div className="p-12">
        <h3 className="text-2xl mb-2 font-semibold tracking-tighter">
          Profile Details
        </h3>
        <p className="text-sm text-gray-500">
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
            style={{ backgroundImage: `url(${fileUrl})` }}
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
          id="personal-info"
          className="mt-10 p-4 bg-gray-100 rounded-md"
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
              />
            </div>
          </form>
        </section>

        <div className="bg-gray-100 h-20 flex justify-end items-center px-10 rounded-b-3xl">
          <motion.button
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};
