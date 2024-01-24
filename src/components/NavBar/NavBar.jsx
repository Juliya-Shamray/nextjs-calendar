"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";
import { useSelector } from "react-redux";
import { selectIsLogin, selectIsRefresh } from "@/redux/auth/selectors";
import Logout from "@/app/logout/page";
const NavBar = () => {
  const pathname = usePathname();
  const isLogin = useSelector(selectIsLogin);
  return (
    <nav className=" nav container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link
            className={`link ${pathname === "/" ? "active" : "nav-link"}`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`link ${
              pathname === "/calendar" ? "active" : "nav-link"
            }`}
            href="/calendar"
          >
            Calendar
          </Link>
        </li>
        {isLogin ? (
          <Logout />
        ) : (
          <>
            <li className="nav-item">
              <Link
                className={`link ${
                  pathname === "/register" ? "active" : "nav-link"
                }`}
                href="/register"
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`link ${
                  pathname === "/login" ? "active" : "nav-link"
                }`}
                href="/login"
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
