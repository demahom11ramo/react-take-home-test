
import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-indigo-600">ShopBrowser</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Products
            </Link>
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
