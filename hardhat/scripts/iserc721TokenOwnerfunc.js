const { ethers, getNamedAccounts } = require("hardhat")

// mint nft for user2,3,4,5

async function iserc721TokenOwnerfunc() {
    const nft1 = await ethers.getContract("Nft1")
    const SmartWallet = await ethers.getContractAt("SmartWallet","0x75537828f2ce51be7289709686A69CbFDbB714F1")
    const iserc721TokenOwner=await SmartWallet.iserc721TokenOwner(nft1.target)
    console.log("name =",iserc721TokenOwner) 
    //console.log(SmartWallet)
}

iserc721TokenOwnerfunc()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })