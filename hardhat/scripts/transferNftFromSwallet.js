const { ethers, getNamedAccounts } = require("hardhat");
const SmartWalletAbi = require("./abis");

// mint nft for user2,3,4,5

async function addNfttoSwallet() {
    const {deployer,user1}=await getNamedAccounts()
    const SmartWallet = await ethers.getContractAt("SmartWallet","0x75537828f2ce51be7289709686A69CbFDbB714F1")
     let provider=new ethers.JsonRpcProvider('http://127.0.0.1:8545/');
     let user1Wallet =new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',provider)
    console.log(provider)
     let nftC=new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3",["function transferFrom(address,address,uint256)"])
    let funcNameWithARguments=await nftC.transferFrom.populateTransaction("0x75537828f2ce51be7289709686A69CbFDbB714F1",deployer,2);
    console.log(funcNameWithARguments.data)
    

    let swlC=new ethers.Contract("0x75537828f2ce51be7289709686A69CbFDbB714F1",SmartWalletAbi)
             let txData=await swlC.erc721Caller.populateTransaction("0x5FbDB2315678afecb367f032d93F642f64180aa3","0x23b872dd00000000000000000000000075537828f2ce51be7289709686a69cbfdbb714f1000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000001")
             console.log("yoy =",txData.data) 



             let tx = {
                nonce:2,
                to: "0x75537828f2ce51be7289709686A69CbFDbB714F1", // The address of the receiver
                // The amount of ether to send
                data: "0xdd81b82a0000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa30000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006423b872dd00000000000000000000000075537828f2ce51be7289709686a69cbfdbb714f1000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000", // The data to send, e.g. a function call
                 // The maximum gas to use
                gasPrice: (await provider.getFeeData()).gasPrice,
                chainId:31337 // The price of gas in wei
              };
              let gasLimit=await provider.estimateGas(tx);
            console.log(gasLimit)
            
            let tx1={...tx,gasLimit}
            
            tx=tx1; 
            console.log(tx)
   /*  let swlC=new ethers.Contract("0x75537828f2ce51be7289709686A69CbFDbB714F1",SmartWalletAbi)
        let txData=await swlC.erc20Caller.populateTransaction("0x5FbDB2315678afecb367f032d93F642f64180aa3",funcNameWithARguments.data)
        console.log(txData.data) 

         let trnx = {
            nonce:3,
            to: "0x75537828f2ce51be7289709686A69CbFDbB714F1", // The address of the receiver
            // The amount of ether to send
            data: txData.data, // The data to send, e.g. a function call
             // The maximum gas to use
            gasPrice: (await provider.getFeeData()).gasPrice,
            chainId:31337 // The price of gas in wei
          };
          let gasLimit=210000;
        console.log(gasLimit)
        
        let tx1={...trnx,gasLimit}
        
        trnx=tx1;
        console.log(trnx)
        let signature=await user1Wallet.signTransaction(trnx)
    console.log(signature)
    let txHash=await provider.broadcastTransaction(signature);
    let txReciept=await provider.waitForTransaction(txHash.hash);
     console.log(txReciept) */
     
  /*  let ans5=await SmartWallet.erc721Caller("0x5FbDB2315678afecb367f032d93F642f64180aa3",funcNameWithARguments.data)
     ans5=await ans5.wait(); 
     console.log(ans5) */
       /*let updateErc721=await SmartWallet.updateerc721Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3",1)
     console.log(updateErc721)
     let ans6=await SmartWallet.iserc721TokenOwner("0x5FbDB2315678afecb367f032d93F642f64180aa3")
     console.log(ans6) */

}

addNfttoSwallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })