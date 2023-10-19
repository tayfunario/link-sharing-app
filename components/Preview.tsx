import { LinkProps } from "../pages";

interface PreviewProps {
  links: LinkProps[];
}

export const Preview = ({ links }: PreviewProps) => {
  return (
    <div className="col-span-2 max-h-screen bg-white rounded-3xl">
      {links.map((link) => (
        <p key={link.id}>
          {link.icon} {link.platform} {link.url}
        </p>
      ))}
    </div>
  );
};
