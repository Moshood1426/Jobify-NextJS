import StatusCodes from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please input all values");
  }

  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const oldJob = await Job.findOne({ _id: jobId });
  if (!oldJob) {
    throw new NotFoundError(`Job with id ${jobId} not found`);
  }

  await oldJob.remove();
  res.status(StatusCodes.OK).json({ msg: "job succesfully deleted" });
};

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find({ ...queryObject });

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //10
  result = result.skip(skip).limit(limit);
  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ totalJobs, jobs, numOfPages });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOne({ _id: id });
  
  if (!job) {
    throw new NotFoundError("Job with id " + id + " cannot be found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please input all values");
  }

  const oldJob = await Job.findOne({ _id: jobId });
  if (!oldJob) {
    throw new NotFoundError(`Job with id ${jobId} not found`);
  }

  const job = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Job updated" });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, item) => {
    const { _id: title, count } = item;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res
    .status(StatusCodes.OK)
    .json({ stats: defaultStats, monthlyApplications: monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats, getSingleJob };
