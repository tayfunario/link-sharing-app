import { LinkProps } from "../pages";
import { PreviewItem } from "./PreviewItem";

export const Preview = ({ links }: { links: LinkProps[] }) => {
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
        <ul id="preview-items-list" className="relative bottom-[57%] pr-1 mx-auto w-3/4 max-h-[300px] overflow-y-auto">
          {links &&
            links.map((link) => <PreviewItem key={link.id} link={link} />)}
        </ul>
      </div>
    </div>
  );
};
