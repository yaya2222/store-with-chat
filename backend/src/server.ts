import mongoose from "mongoose"
import app from "./app"
const port = process.env.PORT as string


mongoose.connect(process.env.MONGO_URL as string).then(
    () => {
        console.log("Mongoose connected")
        app.listen(port!, () => console.log(`Server is runnig on port: ${port}`))
    }
    )
    .catch((e)=>console.error(e))