"use client";
import useAppContext from "@/store/appContext";
import classes from "../styles/bigSidebar.module.css";
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSideBar = () => {
  const { showSidebar } = useAppContext();

  return (
    <aside className={classes.aside}>
      <div
        className={
          showSidebar
            ? classes.sidebar_container
            : `${classes.sidebar_container} ${classes.show_sidebar}`
        }
      >
        <div className={classes.content}>
          <header className={classes.header}>
            <div className={classes.logo}>
              <Logo />
            </div>
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

export default BigSideBar;
