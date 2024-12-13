require("dotenv").config();
import express,{NextFunction,Request,Response} from "express";
export const app = express()
import cors from 'cors';
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error";
const morgan = require('morgan');
import userRouter from "./routes/user.routes";


app.use(express.json({limit:"50mb"}));
app.use(morgan('dev'))

// cookie parser
app.use(cookieParser())

// corss origin resource sharing
app.use(cors({
    origin:'https://bssolutionfirst.vercel.app', // Allow requests from localhost:3000
    credentials: true, // Allow cookies and credentials
}));

// Import router
app.use('/api/v1',userRouter)


// testing API

app.get("/test",(req:Request, res:Response, next:NextFunction)=>{
    res.status(200).json({
        success :true,
        message : "Api is working"
    })
})

// unknown routes
app.all("*",(req:Request,res:Response, next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err)
})


// Error-handling middleware
app.use(errorMiddleware);