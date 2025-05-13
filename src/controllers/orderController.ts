import { Request,Response } from "express";

import Order from "../models/Order";

export const getAllOrders=async(req:Request,res:Response)=>{
     try{
       const orders=await Order.find();
       return res.status(200).json(orders);
     }
     catch(error:any){
         return res.status(500).json({message:"Error fetching Orders",error:error.message});
     };
}


export const createOrder=async(req:Request, res:Response)=>{
    try{
    const newOrder=new Order(req.body);
     await newOrder.save();
     return res.status(201).json(newOrder);
    } catch(error:any){
        return res.status(400).json({message:"Error Creating order!!",error:error.message});
    }
};


export const updateOrderStatus=async(req:Request,res:Response)=>{
    try{
       
    const {id}=req.params;
    const{status}=req.body;

    const validStatuses=['pending','assigned','picked','delivered'];
     if(!validStatuses.includes(status)){
        return res.status(400).json({message:"Invalid Status Value!!"});
     }

     const updatedOrder=await Order.findByIdAndUpdate(
        id,
        {status},
        {new:true}
     );

     if(!updatedOrder){
         return res.status(404).json({message:"Order Not Found!!"});
     }

     return res.status(200).json(updatedOrder);

    }catch(error:any){
       return res.status(500).json({message:"Error Updating order Status",error: error.message})
    }
}