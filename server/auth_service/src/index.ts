import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import { Jwt, sign, verify } from 'jsonwebtoken'
import { AddressLike, Block, BytesLike, InfuraProvider, SignatureLike, ethers, hashMessage, isBytesLike, recoverAddress,JsonRpcProvider } from 'ethers'
import { getMessage, signMessage, verifyMessage } from '../src/utils/serverWallet1'

//type JwtPayload=
type TokenInterface<T>={
    nonce:number,
    address:string
  } & T

const app=express();


app.use(cookieParser())

const provider=new InfuraProvider('sepolia','34e42f1acb22477886b82aaba9e4a099')
//let address="0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f"
const provider1=new JsonRpcProvider('http://127.0.0.1:8545/')
app.get('/nonce',async(req:express.Request,res:express.Response)=>{
    try {
        let address=req.query.address as string;
    let nonce=await provider1.getTransactionCount(address as AddressLike,"latest");
    let tempToken=sign({nonce,address},process.env.JWT_SECRET,{expiresIn:'60s'})
    let message=getMessage(nonce,address)
    
   
    
    res.json({
        message, //put to header
        tempToken,//put to header
        "nonce":nonce
    })
    } catch (error) {
        console.log(error)
    }
    
})

app.post('/verify',async(req:express.Request,res:express.Response)=>{
    try {
        const authHeader=req.headers['authorization']
        console.log("authTOken ",authHeader)
        let signature=req.headers['signature'] as string
        console.log("sig ",signature)
        if(!authHeader) throw Error("no authToken")
        if(!signature) throw Error("no signature")
        let {nonce,address}=verify(authHeader,process.env.JWT_SECRET) as TokenInterface<typeof verify>;
    console.log("address nonce",address,nonce)
       
        let message=getMessage(nonce,address)
        
        let recoveredData=verifyMessage(message,signature)
        if(recoveredData==address){
            let verifiedToken=sign({recoveredData},process.env.JWT_SECRET,{expiresIn:'1d'})

            res.cookie("jwt",verifiedToken,{httpOnly:true})
            res.json({authHeader,signature,message,recoveredData})
        }else{res.status(403).json({message:"invalid address or token"})    }

        
    } catch (error) {
        console.log(error)
    }
    
    
})


app.listen(process.env.PORT,()=>{
    console.log(`auth server started and listening on port  ${process.env.PORT}`)
})