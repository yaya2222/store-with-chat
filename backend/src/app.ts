import express  from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/userRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use("/api/v1/user",userRoute)

export default app