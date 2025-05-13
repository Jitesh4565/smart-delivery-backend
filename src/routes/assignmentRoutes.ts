import express from "express";
import { getAssignmentMetrics, runAutoAssignment } from "../controllers/assignmentController";

const router=express.Router();

router.post("/run",runAutoAssignment);
router.get("/metrics",getAssignmentMetrics);

export default router;