
import{Request,Response} from "express";
import Order from "../models/Order";
import DeliveryPartner from "../models/DeliveryPartner";
import Assignment from "../models/Assignment";


export const runAutoAssignment=async(req:Request,res:Response):Promise<Response>=>{

    try{
      const pendingOrders=await Order.find({status:'pending'});
      const results=[];
      
      for(const order of pendingOrders){
          
        // Find Eligible Delivery Partners
        const eligiblePartners=await DeliveryPartner.find({
            status:'active',
            currentLoad:{$lt:3},
            areas:order.area,
        });

        // Filter By Shift

        const orderTime=parseInt(order.scheduledFor.replace(":",""),10);

        const availablePartners=eligiblePartners.filter((partner)=>{
            const start=parseInt(partner.shift.start.replace(":",""),10);
            const end=parseInt(partner.shift.end.replace(":",""),10);
            return orderTime >=start && orderTime<=end;
        });

        //Pick the best partner available

        const selectedPartner=availablePartners.sort((a,b)=>{
             if(a.currentLoad === b.currentLoad){
                 return b.metrics.rating-a.metrics.rating;
             }

             return a.currentLoad - b.currentLoad;
        })[0];

        // If Partner found assign Order

        if(selectedPartner){  
            order.assignedTo = selectedPartner._id as string;
            order.status="assigned";
            await order.save();

            selectedPartner.currentLoad+=1;
            await selectedPartner.save();

            await Assignment.create({
                orderId:order._id,
                partnerId:selectedPartner._id,
                status:'success',
                timestamp:new Date(),
            });

            results.push({
                orderId:order._id,
                partnerId:selectedPartner._id,
                status:"success",
            });
      } else{
          await Assignment.create({
             orderId:order._id,
             partnerId:"N/A",
             status:'failed',
             timestamp:new Date(),
             reason:"No available Partner in area/shift",
          });

          results.push({
             orderId:order._id,
             status:"failed",
             reason:"No available partner in area/shift",
          });
      }
    }

    return res.status(200).json({message:"Assignment process Completed",results});

    }catch(error:any){
         
        return res.status(500).json({message:"Assignmen failed",error:error.message});
    }
};

export const getAssignmentMetrics=async(req:Request,res:Response):Promise<Response>=>{

    try{
      const allAssignments=await Assignment.find();
      const total=allAssignments.length;
      const successful=allAssignments.filter(a=>a.status==='success');
      const failed=allAssignments.filter(a=>a.status==='failed');
      const totalAssigned=successful.length;
      const successRate=total > 0?(totalAssigned/total)*100:0;
      const averageTime=0;

       const failureMap:Record<string,number>={};
        for(const a of failed){
             const reason=a.reason || 'Unknown';
             failureMap[reason]=(failureMap[reason]||0)+1;
        }

        const failureReasons=Object.entries(failureMap).map(([reason,count])=>({reason,count}));

        return res.status(200).json({
            totalAssigned,
            successRate:parseFloat(successRate.toFixed(2)),
            averageTime,
            failureReasons
        });
    }catch(error:any){
           return res.status(500).json({message:"Error Calculating Metrics!!",error:error.message})
    }
};