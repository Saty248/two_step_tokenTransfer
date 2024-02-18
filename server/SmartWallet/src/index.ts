import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import { Jwt, sign, verify } from 'jsonwebtoken'
import { AddressLike, Block, BytesLike, InfuraProvider, SignatureLike, TransactionLike, Wallet, ethers, hashMessage, isBytesLike, recoverAddress } from 'ethers'
import { user1Wallet } from 'utils/provider'
import { getDefaultHighWaterMark } from 'stream'
import { createTx, getWalletFromMapper, sendTransactionToChain } from './controllers'
import { SmartWallet } from './utils/singletonCLasses'


const app=express();

app.use(express.json())
app.use(cookieParser())

let provider;
let contractMapper=process.env.contractMapper;
//let address="0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f"


app.get('/',(req:express.Request,res:express.Response)=>{
    provider=new ethers.JsonRpcProvider('http://127.0.0.1:8545/')
})
app.get('/getWallet',async (req:express.Request,res:express.Response)=>{
try {
    let query=req.query;
    let ans=await getWalletFromMapper(query.address as string);
    console.log(ans)
    if(ans=="tx failed"){
     
        res.json({"isWallet":"false","address":"","message":"failed to create wallet"})
    }else{
        res.json({"isWallet":"true","address":ans})
    }
    

} catch (error) {
    console.log(error)
}
})
app.get('/adderc721ContractData',async(req:express.Request,res:express.Response)=>{
try {
    SmartWallet.getInstance();
    let {walletAddress,smartWalletaddress,nftAddress,tokenId}=req.query;
    let ans=await SmartWallet.adderc721ContractData(smartWalletaddress as string,nftAddress as string,tokenId as string);
    let tx=await createTx(walletAddress as AddressLike,smartWalletaddress as AddressLike,ans as string);
    //console.log(tx)
    res.json({"tx":tx})
} catch (error) {
 console.log(error)   
}

})

app.get('/erc721CallerData',async(req:express.Request,res:express.Response)=>{
    try {
        SmartWallet.getInstance();
        let {walletAddress,smartWalletaddress,nftAddress,txData}=req.query;
        let ans=await SmartWallet.erc721CallerData(smartWalletaddress as string,nftAddress as string,txData as string)

        console.log("erc721CallerData=",ans)
        let tx=await createTx(walletAddress as AddressLike,smartWalletaddress as AddressLike,ans as string);
    //console.log(tx)
    res.json({"tx":tx})
    } catch (error) {
        console.log(error)
    }
})

/* app.get('/addSignature',async(req:express.Request,res:express.Response)=>{
   try {
    let {signature}=req.query;
    await sendTransactionToChain(signature as TransactionLike)    
    res.json({
        "signature":signature
    })

   } catch (error) {
    console.log(error)
   }
}) */

app.listen(process.env.PORT,()=>{
    console.log(`auth server started and listening on port  ${process.env.PORT}`)
})