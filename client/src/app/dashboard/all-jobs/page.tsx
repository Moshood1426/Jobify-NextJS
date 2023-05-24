import React from "react";
import SingleJob from "@/components/SingleJob";

// export const getStaticProps = () => {};

const mockData = [
  {
    jobLocation: "Itaúna",
    company: "Torp, Pollich and Dickinson",
    position: "Professor",
    jobType: "remote",
    status: "declined",
    createdAt: "2021-04-09T14:11:12Z",
  },
  {
    jobLocation: "Bohus",
    company: "Orn-Cole",
    position: "Nurse",
    jobType: "internship",
    status: "interview",
    createdAt: "2022-02-05T18:37:54Z",
  },
  {
    jobLocation: "Besao",
    company: "Kub, Waelchi and Wisoky",
    position: "Associate Professor",
    jobType: "internship",
    status: "declined",
    createdAt: "2019-06-26T06:33:53Z",
  },
  {
    jobLocation: "Pereiro",
    company: "Gusikowski, Spencer and Bailey",
    position: "Computer Systems Analyst IV",
    jobType: "full-time",
    status: "interview",
    createdAt: "2020-04-14T19:35:05Z",
  },
];

const page = () => {
  return <div>All Jobs</div>;
};

export default page;
