import React from "react";
import { useState } from "react";
import { JSX } from "react";
import { Link } from "react-router-dom";

type NavLink = {
  link: string;
  label: string;
};

const links: NavLink[] = [
  { link: "/about", label: "Features" },
];

export function AppHeader(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleMenu = (): void => setOpened(!opened);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="sm:hidden p-2 rounded bg-gray-200">
            {opened ? "✖" : "☰"}
          </button>
          <img
            src="/src/assets/jamcraft.png"
            alt="Jamcraft logo"
            className="w-48 h-auto"
          />
        </div>

        <nav className="hidden sm:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.link}
              className="text-gray-700 hover:text-blue-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {opened && (
          <nav className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 sm:hidden">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.link}
                className="text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
