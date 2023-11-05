import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { useRouter } from "next/router";

export const links = [
  { href: "/Manager/addnewtask", label: "Add New Task" },
  { href: "/login", label: "Login" },
  { href: "/teste", label: "Teste" },
];

const HamburgerMenu = () => {
  const router = useRouter();

  return (
    <div className="relative p-2">
      <Menu
        customBurgerIcon={<HamburgerIcon />}
        width={"auto"}
        className="left-0 top-12"
      >
        {links.map((link, index) => (
          <MenuItem
            key={index}
            href={link.href}
            label={link.label}
            isActive={router.pathname === link.href}
          />
        ))}
      </Menu>
    </div>
  );
};

const HamburgerIcon = () => (
  <div className="p-1/2">
    <svg
      className="w-8 h-8 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </div>
);

const MenuItem = ({ href, label, isActive }) => {
  return (
    <div className={isActive ? "active-link" : ""}>
      {isActive ? <span>{label}</span> : <Link href={href}>{label}</Link>}
    </div>
  );
};

export default HamburgerMenu;
