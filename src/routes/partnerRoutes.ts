import express from "express";
import { createPartner,deletePartner,getAllPartners, updatePartner} from "../controllers/partnerController";



const router=express.Router();

router.post("/",createPartner);
router.get("/",getAllPartners);

router.put("/:id", async (req, res, next) => {
    try {
        await updatePartner(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async(req,res,next)=>{
      try{
           await deletePartner(req,res);
      }
      catch(error)
      {
          next(error);
      }
});

export default router;