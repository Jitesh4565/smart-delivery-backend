import  express from "express";
import cors from 'cors';
import partnerRoutes from "./routes/partnerRoutes";
import orderRoutes from './routes/orderRoutes';
import assignmentRoutes from "./routes/assignmentRoutes";
const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/partners',partnerRoutes);
app.use('/api/orders',orderRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;