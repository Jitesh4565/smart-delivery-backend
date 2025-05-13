
import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController";

const router=express.Router();

router.get("/",async(req,res,next)=>{
    try{

        await getAllOrders(req,res);

    }catch(error){
        next(error);
    }
});

router.post("/create",async(req,res,next)=>{
     try{
        await createOrder(req,res);
     }catch(error){
        next(error);
     }
});

router.put("/:id/status", async (req, res, next) => {
    try {
        await updateOrderStatus(req, res);
    } catch (error) {
        next(error);
    }
});
export default router;