
import express from "express";
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController";

const router=express.Router();

router.get("/",getAllOrders);
router.post("/create",createOrder);
router.put("/:id/status",updateOrderStatus);

export default router;