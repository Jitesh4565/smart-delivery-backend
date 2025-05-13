import mongoose, { Schema } from "mongoose";


export interface IDeliveryPartner extends Document{

    name:string;
    email:string;
    phone:string;
    status:"active"|"inactive";
    currentLoad:number;
    areas:string[];
    shift:{
        start:string;
        end:string;
    };

    metrics:{
        rating:number;
        completedOrders:number;
        cancelledOrders:number;
    };
}


const DeliveryPartnerSchema:Schema=new Schema(
    {
       
        name:{type:String,required:true},
        email:{type:String,required:true},
        phone:{type:String,required:true},
        status:{type:String,enum:["active","inactive"],required:true},
        currentLoad:{type:Number,required:true,max:3},
        areas:[{type:String,required:true}],
        shift:{
            start:{type:String,required:true},
            end:{type:String,required:true},
        },
        metrics:{
            rating:{type:Number,required:true},
            completedOrders:{type:Number,required:true},
            cancelledOrders:{type:Number,required:true}
        }
    },
    {
        timestamps:true
    }
);


const DeliveryPartner=mongoose.model<IDeliveryPartner>(
    "DeliveryPartner",
    DeliveryPartnerSchema
);

export default DeliveryPartner;