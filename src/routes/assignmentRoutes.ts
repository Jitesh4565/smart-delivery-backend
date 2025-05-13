import express from "express";
import { getAssignmentMetrics, runAutoAssignment } from "../controllers/assignmentController";

const router=express.Router();

router.post("/run",async(req,res,next)=>{
    try{
       await runAutoAssignment(req,res);
    }catch(error){
        next(error);
    }
});
router.get("/metrics",async(req,res,next)=>{
    try{
        await getAssignmentMetrics(req,res);

    }catch(error){
        next(error);
    }
});

export default router;