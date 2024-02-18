import 'dotenv/config'
import {AddressLike, Contract, SignatureLike, TransactionLike, ethers} from 'ethers'
import { contractDeployerAbi, contractMapperAbi } from './utils/abi';
import { deployerWallet, provider } from './utils/provider';

export const getWalletFromMapper=async(userAddress:string)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
let mapperAddress=process.env.contractMapper;

let contractMapperContract=new Contract(mapperAddress,contractMapperAbi,deployerWallet)
let smartWalletAddress=await contractMapperContract.getSmartAccount(userAddress)

if(smartWalletAddress==='0x0000000000000000000000000000000000000000'){
    let deployerAddress=process.env.contractDeployer
    let contractDeployerContract=new Contract(deployerAddress,contractDeployerAbi,deployerWallet)
    let tx=await contractDeployerContract.createAndAddSmartAccount(userAddress,mapperAddress)
    let reciept=await tx.wait();
    if(reciept.status==1){
        let newsmartWalletAddress=await contractMapperContract.getSmartAccount(userAddress)
        return newsmartWalletAddress;
    }else return "tx failed"
    
}else{
    return smartWalletAddress
}



}

export const sendTransactionToChain=async(signature:TransactionLike)=>{
let ans=await provider.broadcastTransaction(signature as string);
console.log("tx added=",ans);

}

export const createTx=async (walletAddress:AddressLike,smartWalletAddress:AddressLike,txData:string)=>{
    let tx = {
        nonce:await provider.getTransactionCount(walletAddress),
        to:smartWalletAddress,
        data: txData,
        gasPrice: (await provider.getFeeData()).gasPrice.toString(),
        chainId:31337 
      };
      let gasLimit=await provider.estimateGas(tx);
//console.log(gasLimit)

let tx1={...tx,gasLimit:gasLimit.toString()}
//console.log(tx)
tx=tx1;
return tx;
}

/* console.log(createTx("0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x75537828f2ce51be7289709686A69CbFDbB714F1","0x5FbDB2315678afecb367f032d93F642f64180aa3").then((data1)=>{console.log("data=",data1)})
) */