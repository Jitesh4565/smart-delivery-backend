
import mongoose,{Document,Schema, Types}from "mongoose";

interface IOrderItem{
    name:string;
    quantity:number;
    price:number;
}

interface IOrder extends Document{

    orderNumber:string;
    customer:{
        name:string;
        phone:string;
        address:string;
    };
    area:string;
    items:IOrderItem[];
    status:'pending' | 'assigned' | 'picked'|'delivered';
    scheduledFor:string;
    assignedTo?:string | Types.ObjectId;
    totalAmount:number;
    createdAt:Date;
    updatedAt:Date;
}

const OrderSchema:Schema=new Schema<IOrder>(
    {
       orderNumber:{type:String,required:true},
       
       customer:{
          name:{type:String,required:true},
          phone:{type:String,required:true},
          address:{type:String,required:true},
       },

       area:{type:String,required:true},
       items:[
        {
            name:{type:String,required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true},
        },
       ],
       status:{
         type:String,
         enum:['pending','assigned','picked','delivered'],
         default:'pending',
       },
       scheduledFor:{type:String,required:true},
       assignedTo:{type:String},
       totalAmount:{type:Number,required:true},
    },
    {timestamps:true}
);


export default mongoose.model<IOrder>('Order',OrderSchema);