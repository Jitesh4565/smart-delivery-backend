
import mongoose,{Document,Schema} from 'mongoose';

export interface IAssignment extends Document{

    orderId:string;
    partnerId:string;
    timestamp:Date;
    status:"success"|"failed";
    reason?:string;
}

const AssingmentSchema:Schema=new Schema<IAssignment>(
    {
        orderId:{type:String,required:true},
        partnerId:{type:String,required:true},
        timestamp:{type:Date,required:true,default:Date.now},
        status:{type:String,enum:["success","failed"],required:true},
        reason:{type:String},
    },
    {timestamps:true}
);

export default mongoose.model<IAssignment>("Assignment",AssingmentSchema);