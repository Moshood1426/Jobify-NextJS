import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  getSingleJob,
} from "../controllers/jobController.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").get(getSingleJob).delete(deleteJob).patch(updateJob);

export default router;
