import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menus = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/" },
    { name: "Album", path: "/album" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="align-center m-6 flex justify-center border-3 p-2 shadow-xl">
      {menus.map((menu, index) => (
        <div key={index} className="flex">
          {index > 0 && <div className="mx-2">|</div>}
          {currentPath === menu.path ? (
            <Link to={menu.path} className="cursor-pointer font-bold underline">
              {menu.name}
            </Link>
          ) : (
            <Link
              to={menu.path}
              className="cursor-pointer hover:font-bold hover:underline"
            >
              {menu.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Navbar;
