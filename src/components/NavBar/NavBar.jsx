import Link from "next/link";
import "./styles.css";
const NavBar = () => {
  return (
    <nav className=" nav container">
      <ul className="nav-list">
        <li>
          <Link className="nav-link" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/calendar">
            Calendar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
