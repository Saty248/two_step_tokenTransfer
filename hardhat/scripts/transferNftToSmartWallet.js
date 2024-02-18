const { ethers, getNamedAccounts } = require("hardhat")

// mint nft for user2,3,4,5

async function transferTOsmRTWAllet() {
    const {deployer,user1}=await getNamedAccounts()
    const nft1 = await ethers.getContract("Nft1",user1)
   
  
   const transfer1=await nft1.transferFrom(user1,"0x75537828f2ce51be7289709686A69CbFDbB714F1","1")
  // let intA=parseInt(name);
    console.log("tx =",transfer1)
}

transferTOsmRTWAllet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })