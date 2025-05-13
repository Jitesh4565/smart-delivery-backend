

import { Request, Response } from "express";
import DeliveryPartner from "../models/DeliveryPartner";

export const createPartner=async(req:Request,res:Response)=>{

    try{
      const partner=new DeliveryPartner({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        status:req.body.status,
        currentLoad:req.body.currentLoad,
        areas:req.body.areas,
        shift:req.body.shift,
        metrics:req.body.metrics
      });

      const savedPartner=await partner.save();
      res.status(201).json(savedPartner);
    }
    catch(error){

        res.status(400).json({message:"Error creating Partner!!",error});

    }
};


export const getAllPartners=async(req:Request,res:Response)=>{
      
    try{
       const partners=await DeliveryPartner.find();
       res.json(partners);
    }

    catch(error)
    {
       res.status(500).json({message:"Error Fetching partners!!",error});
    }
};


export const updatePartner = async (req: Request, res: Response): Promise<Response> => {
  try {
    const partnerId = req.params.id;
    const updatedData = req.body;

    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(partnerId, updatedData, {
      new: true,
    });

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found!" });
    }

    return res.status(200).json(updatedPartner);
  } catch (error) {
    return res.status(400).json({ message: "Error updating partner!", error });
  }
};


export const deletePartner= async (req:Request,res:Response):Promise<Response>=>{
      
    try{
         const partnerId=req.params.id;
         const deletedPartner=await DeliveryPartner.findByIdAndDelete(partnerId);

         if(!deletedPartner)
         {
            return res.status(404).json({message:"Partner Not Founnd!!"});
         }

         return res.status(200).json({message:"Partner Deleted Successfully!!"});
    }
     catch(error)
     {
         return res.status(400).json({message:"Error Deleting partner"});
     }
   
};