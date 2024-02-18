const { ethers, getNamedAccounts } = require("hardhat")

// mint nft for user2,3,4,5

async function addNfttoSwallet() {
    const SmartWallet = await ethers.getContractAt("SmartWallet","0x75537828f2ce51be7289709686A69CbFDbB714F1")
    const iserc721TokenOwner=await SmartWallet.adderc721Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3","2");
    console.log("name =",iserc721TokenOwner) 
    //console.log(SmartWallet)
}

addNfttoSwallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })