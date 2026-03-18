import { NavLink, useNavigate } from "react-router";
import { navbarClass, navBrandClass, navContainerClass, navLinkActiveClass, navLinkClass, navLinksClass } from "../styles/common";
function Header() {
  const navigate = useNavigate();
  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        {/* Logo */}
        <NavLink to="/" className={navBrandClass}>
          MyBlog
        </NavLink>
        <ul className={navLinksClass}>
          {/* Always visible */}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
