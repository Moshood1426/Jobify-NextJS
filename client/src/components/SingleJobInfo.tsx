import React, { ReactNode } from "react";
import classes from "../styles/jobInfo.module.css";

const SingleJobInfo: React.FC<{ icon: ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <div className={classes.content}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.text}>{text}</span>
    </div>
  );
};

export default SingleJobInfo;
