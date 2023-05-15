"use client";

import React, { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import useAppContext from "@/store/appContext";
import classes from "../styles/navbar.module.css";

interface NavBarProps {
  user: { name: string } | null;
}

const Navbar: React.FC<NavBarProps> = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar } = useAppContext();

  const logoutUser = () => {};

  return (
    <nav className={classes.nav_bar}>
      <div className={classes.nav_center}>
        <button
          type="button"
          className={classes.toggle_btn}
          onClick={() => toggleSidebar()}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo logoStyle={classes.logo} />

          <h3 className={classes.logo_text}>dashboard</h3>
        </div>
        <div className={classes.btn_container}>
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            <span className={classes.username}>{user?.name}</span>
            <FaCaretDown />
          </button>
          <div
            className={
              showLogout
                ? `${classes.dropdown} ${classes.show_dropdown}`
                : classes.dropdown
            }
          >
            <button
              type="button"
              className={classes.dropdown_btn}
              onClick={logoutUser}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
