import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

const app=express();


app.use(cookieParser())


app.get('/',async (req:express.Request,res:express.Response)=>{
    try {
        res.json({
            "message":"hello"
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`auth server started and listening on port  ${process.env.PORT}`)
})