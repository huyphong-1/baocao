// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";   // ✅ đúng đường dẫn
import Logo from "../assets/logo.png";            // ✅ xem bước 2 bên dưới

const Menu = [
  { id: 1, name: "Điện thoại", link: "/phones" },
  { id: 2, name: "Phụ kiện", link: "/accessories" },
  { id: 3, name: "Khuyến mãi", link: "/sale" },
  { id: 4, name: "Hỗ trợ", link: "/support" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

const Navbar = ({ handleOrderPopup }) => {
  const { cartCount } = useCart();

  return (
    <div className="shadow-md bg-slate-950 text-slate-100 duration-200 relative z-40">
      {/* Thanh trên */}
      <div className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* Nếu chưa có logo.png thì tạm thời bỏ <img> này hoặc để 1 màu nền */}
            <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-sm font-bold">
              TP
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">TechPhone</p>
              <p className="text-[11px] text-slate-400">
                Điện thoại chính hãng - Giá tốt
              </p>
            </div>
          </Link>

          {/* Search + nút Order + Darkmode */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Tìm theo tên điện thoại..."
                className="w-52 md:w-64 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 pr-8 text-xs outline-none focus:border-blue-500"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                <IoMdSearch />
              </span>
            </div>

            {handleOrderPopup && (
              <button
                onClick={handleOrderPopup}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-xs font-medium hover:opacity-90"
              >
                <span>Order</span>
                <FaCartShopping className="text-sm" />
              </button>
            )}

            <DarkMode />

            {/* Nút giỏ hàng cho mobile */}
            <Link
              to="/cart"
              className="sm:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500 text-xs font-medium"
            >
              <FaCartShopping />
              <span>{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Thanh dưới: menu + giỏ hàng */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 h-11 flex items-center justify-between">
          <ul className="flex items-center gap-4 text-xs">
            {Menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="px-2 py-1 hover:text-blue-400 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown */}
            <li className="relative group cursor-pointer">
              <button className="flex items-center gap-1 py-1 text-xs">
                Trending Products
                <FaCaretDown className="text-[10px] transition group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-xl hidden group-hover:block">
                <ul className="py-1 text-xs">
                  {DropdownLinks.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.link}
                        className="block px-3 py-1.5 hover:bg-slate-800"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>

          {/* Giỏ hàng (desktop) */}
          <Link
            to="/cart"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500 text-xs font-medium hover:bg-blue-600"
          >
            <FaCartShopping />
            <span>Giỏ hàng ({cartCount})</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
