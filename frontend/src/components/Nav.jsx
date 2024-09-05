import { navIcons, navLinks } from "../constants";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-10 md:px-[77px] py-6 bg-white">
      <img src="logo.svg" />
      <ul className="list-none hidden sm:flex flex-row gap-10 ">
        {navLinks.map((link) => (
          <li key={link.id} className="font-poppins text-black font-medium ">
            {link.title}
          </li>
        ))}
      </ul>
      <ul className="list-none hidden sm:flex flex-row gap-4">
        {navIcons.map((icon) => (
          <li key={icon.id} className="md:px-3 gap-10">
            <img src={icon.icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
