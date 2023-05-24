import useAppContext from "@/store/appContext";
import React from "react";
import moment from "moment";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import SingleJobInfo from "./SingleJobInfo";
import classes from "../styles/singlejob.module.css";

interface SingleJobProps {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: Date;
  status: string;
}

const SingleJob: React.FC<SingleJobProps> = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date: any = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <article className={classes.article}>
      <header className={classes.header}>
        <div className={classes.main_icon}>{company.charAt(0)}</div>
        <div className={classes.info}>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.content_center}>
          <SingleJobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <SingleJobInfo icon={<FaCalendarAlt />} text={date} />
          <SingleJobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`${classes.status} ${classes[status]}`}>{status}</div>
        </div>
        <footer>
          <div className={classes.actions}>
            <Link
              href="/add-job"
              className={`btn ${classes.edit_btn}`}
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className={`btn ${classes.delete_btn}`}
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default SingleJob;
