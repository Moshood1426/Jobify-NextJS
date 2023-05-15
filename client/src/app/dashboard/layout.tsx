import BigSideBar from "@/components/BigSideBar";
import NavBar from "@/components/NavBar";
import SmallSideBar from "@/components/SmallSideBar";
import React from "react";
import classes from "../../styles/sharedlayout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section>
      <main className={classes.dashboard}>
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar user={{ name: "Harbdoul" }} />
          <div className={classes.dashboard_page}>{children}</div>
        </div>
      </main>
    </section>
  );
};

export default Layout;
