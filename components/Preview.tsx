import { LinkProps } from "../pages";

export const Preview = ({ links }: { links: LinkProps[] }) => {
  return (
    <div className="col-span-2 max-h-screen bg-white rounded-2xl">
      {links &&
        links.map((link) => (
          <p key={link.id}>
            {link.icon} {link.platform} {link.url}
          </p>
        ))}
    </div>
  );
};
