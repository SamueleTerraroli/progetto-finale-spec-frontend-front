import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

export default function Navbar() {
    const { favorites } = useFavorites();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
            <div className="relative container mx-auto flex items-center justify-between">
                <div className="text-xl font-bold">GPU Store</div>

                {/* Hamburger Icon */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Menu"
                >
                    ☰
                </button>

                {/* Menu links (mobile + desktop) */}
                <div
                    className={`${isOpen ? "flex" : "hidden"
                        } z-50 absolute top-full left-0 w-full bg-gray-800 flex-col gap-2 p-4 md:gap-6 md:p-0 md:bg-transparent md:static md:flex md:flex-row md:items-center md:w-auto`}
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block px-4 py-2 md:p-0 hover:text-blue-400 transition ${isActive ? "text-blue-400 font-bold" : ""
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/list"
                        className={({ isActive }) =>
                            `block px-4 py-2 md:p-0 hover:text-blue-400 transition ${isActive ? "text-blue-400 font-bold" : ""
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Lista
                    </NavLink>
                    <NavLink
                        to="/compare"
                        className={({ isActive }) =>
                            `block px-4 py-2 md:p-0 hover:text-blue-400 transition ${isActive ? "text-blue-400 font-bold" : ""
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Comparator
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={({ isActive }) =>
                            `relative block px-4 py-2 md:p-0 hover:text-blue-400 transition ${isActive ? "text-blue-400 font-bold" : ""
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Preferiti
                        {favorites.length > 0 && (
                            <span className="absolute top-0-right-6 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}