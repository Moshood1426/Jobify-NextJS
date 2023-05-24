import Link from "next/link";
import links from "../utils/links";
import { usePathname } from "next/navigation";
import useAppContext from "@/store/appContext";

interface NavLinksProps {
  nav_link: string;
  active: string;
  nav_links: string;
  icon: string;
}

const NavLinks: React.FC<NavLinksProps> = ({
  nav_link,
  active,
  nav_links,
  icon,
}) => {
  const pathname = usePathname();
  const { toggleSidebar } = useAppContext();
  const regexTest = new RegExp(pathname, "i");

  return (
    <div className={nav_links}>
      {links.map((link) => {
        const { text, path, id, icon: iconItem } = link;
        const isActive = regexTest.test(path);

        return (
          <Link
            href={`/dashboard/${path}`}
            key={id}
            onClick={() => toggleSidebar()}
            className={isActive ? `${nav_link} ${active}` : nav_link}
          >
            <span className={icon}>{iconItem}</span>
            {text}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
