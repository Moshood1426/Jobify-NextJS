"use client";
import { FaTimes } from "react-icons/fa";
import useAppContext from "../store/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import classes from "../styles/smallSidebar.module.css";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <aside className={classes.aside}>
      <div
        className={
          showSidebar
            ? `${classes.sidebar_container} ${classes.show_sidebar}`
            : classes.sidebar_container
        }
      >
        <div className={classes.content}>
          <button
            type="button"
            className={classes.close_btn}
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks
            icon={classes.icon}
            nav_link={classes.nav_link}
            nav_links={classes.nav_links}
            active={classes.active}
          />
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
