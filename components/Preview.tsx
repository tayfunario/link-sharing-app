import { LinkProps } from "../pages";
import { UserProps } from "../pages";
import { PreviewItem } from "./PreviewItem";

interface PreviewProps {
  links: LinkProps[];
  user: UserProps;
}

export const Preview = ({ user, links }: PreviewProps) => {
  return (
    <div className="col-span-2 flex justify-center max-h-screen bg-white rounded-2xl">
      <div className="relative my-10">
        <svg
          className="mx-auto"
          width="304"
          height="604"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="300"
            height="600"
            rx="30"
            ry="30"
            style={{ fill: "hsl(0, 0%, 95%)", stroke: "black" }}
          />
          <rect
            x="17"
            y="17"
            width="270"
            height="570"
            rx="30"
            ry="30"
            style={{ fill: "white", stroke: "black" }}
          />
          <circle
            cx="150"
            cy="555"
            r="20"
            style={{ fill: "white", stroke: "black" }}
          />
        </svg>
        <div className="absolute w-full top-[10%]">
          <img
            src={user.imgPath}
            className="w-28 h-28 mx-auto mb-5 object-cover rounded-full border border-gray-300"
          />
          {user.firstname ? (
            <>
              <p className="text-center ">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-center text-sm text-gray-600">{user.email}</p>
            </>
          ) : (
            <>
              <div className="w-44 h-4 mx-auto bg-gray-200 rounded-xl mb-2" />
              <div className="w-32 h-3 mx-auto bg-gray-200 rounded-xl" />
            </>
          )}
          <ul
            id="preview-items-list"
            className="pr-1 mx-auto mt-7 w-3/4 max-h-[260px] overflow-y-auto"
          >
            {links &&
              links.map((link) => <PreviewItem key={link.id} link={link} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};
