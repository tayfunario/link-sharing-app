import Linkbox from "./Linkbox";



export const Dashboard = () => {

  return (
    <div className="grow h-screen p-16 bg-white rounded-3xl shadow-md shadow-gray-400">
      <h3 className="text-3xl mb-5 font-normal">Customize Your Links</h3>
      <p>
        Add/edit/remove links below and then share all your profiles with world!
      </p>
      <button className="bg-green-500 text-white font-semibold w-full py-2 my-5 rounded-xl">
        + Add new link
      </button>

      <Linkbox index={1} />
    </div>
  );
};
