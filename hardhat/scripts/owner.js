const { ethers ,getNamedAccounts} = require("hardhat")

async function getNft1s() {
    const nft1 = await ethers.getContract("ContractMapper")
    

    const {deployer,user1}=await getNamedAccounts()
    const owner = (await nft1.owner()).toString()
    
  // let intA=parseInt(name);
    console.log("name =",owner)
}

getNft1s()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })