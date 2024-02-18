import { InfuraProvider, Wallet,hashMessage,recoverAddress,SignatureLike,JsonRpcProvider, ethers } from "ethers";



const provider1=new JsonRpcProvider('http://127.0.0.1:8545/')
const wallet1=new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",provider1)

export const signMessage=async(message:string)=>{
    let signature=await wallet1.signMessage(message)
    return signature    
}

export const getMessage=(nonce:number,address:string)=>{
    return `please sign message with nonce:${nonce} and address ${address}`

}

export const verifyMessage=(message:string,signature:string)=>{
    let recoveredData=recoverAddress(hashMessage(message),signature as SignatureLike)
   return recoveredData
}
verifyMessage(getMessage(0,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),"0x9839b0a5699d6a7e6f1a6796cdfdf39151bd471ea560769373f387b6afb91a1e37926a58ffb9b8ee3aed14491c601d2f638e1ac51266f7b5900530e672cdbbfd1b")
