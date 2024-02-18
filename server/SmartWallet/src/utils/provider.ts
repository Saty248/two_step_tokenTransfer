import 'dotenv/config'
import { Jwt, sign, verify } from 'jsonwebtoken'
import { AddressLike, Block, BytesLike, InfuraProvider, SignatureLike, TransactionRequest, ethers, hashMessage, isBytesLike, recoverAddress, } from 'ethers'
import { chain } from 'lodash';


export let provider=new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
export let user1Wallet =new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',provider)
export let deployerWallet=new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',provider)

/* let tx = {
    nonce:await provider.getTransactionCount(user1Wallet),
    to: "0x75537828f2ce51be7289709686A69CbFDbB714F1", // The address of the receiver
    // The amount of ether to send
    data: txData, // The data to send, e.g. a function call
     // The maximum gas to use
    gasPrice: (await provider.getFeeData()).gasPrice,
    chainId:31337 // The price of gas in wei
  };
  let gasLimit=await provider.estimateGas(tx);
console.log(gasLimit)

let tx1={...tx,gasLimit}
console.log(tx)
tx=tx1;  */

   export let signTransaction=async(tx:TransactionRequest)=>{
    
      let signature=await user1Wallet.signTransaction(tx)
    console.log(signature)
    let txHash=await provider.broadcastTransaction(signature);
    let txReciept=await provider.waitForTransaction(txHash.hash);
     console.log(txReciept)
 
    return signature;
} 
 
  signTransaction( {
    "nonce": 1,
    "to": "0x75537828f2ce51be7289709686A69CbFDbB714F1",
    "data": "0x7250b73e0000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa30000000000000000000000000000000000000000000000000000000000000001",
    "gasPrice": "1368535657",
    "chainId": 31337,
    "gasLimit": "114596"
  })  
console.log(process.env.nftAddress) 
 let nftTransfer=async()=>{
    let contract=new ethers.Contract(process.env.nftAddress,["function transferFrom(address,address,uint256)"])
    let tx=await contract.transferFrom.populateTransaction("0x75537828f2ce51be7289709686A69CbFDbB714F1",deployerWallet,1);
    console.log("nft Transfer data =",tx.data)
}
 nftTransfer(); 

 