import { InfuraProvider, Wallet,hashMessage,recoverAddress,SignatureLike, ethers } from "ethers";



const provider=new InfuraProvider('sepolia','34e42f1acb22477886b82aaba9e4a099')
const wallet1=new Wallet("461e54bf99c87937cd959c9ac8938027f0c9fbc8c838073dd190cbdcb9f3fdfd",provider)

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
verifyMessage(getMessage(157,"0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f"),"0x9839b0a5699d6a7e6f1a6796cdfdf39151bd471ea560769373f387b6afb91a1e37926a58ffb9b8ee3aed14491c601d2f638e1ac51266f7b5900530e672cdbbfd1b")
