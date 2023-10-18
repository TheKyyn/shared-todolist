import React from "react";

const Header = () => {
  return (
    <header className="absolute bg-black z-20 flex w-screen text-white flex-row justify-between border-4 border-white p-6 m-0 ">
      <div className="shake-element sm:hidden md:flex flex-col gap-2 justify-center align-middle p-0 ">
        <a href="/" className="sm:hidden md:flex text-white text-2xl uppercase font-bold">GOLIST!</a>
      </div>
      <nav className="flex flex-row align-middle justify-center p-0 m-0">
        <ul className="flex flex-row gap-20 align-middle items-center p-0 m-0">
          <li>
            <a
              className="uppercase font-bold text-lg hover:bg-white hover:text-black p-2"
              href="LOGOUT"
            >
              LOGOUT
            </a>
          </li>
          <li>
            <a
              className="uppercase font-bold text-lg hover:bg-white hover:text-black p-2"
              href="HELP"
            >
              HELP
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
