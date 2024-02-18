const { ethers, getNamedAccounts } = require("hardhat")

// mint nft for user2,3,4,5

async function mint_nft1() {
    const nft1 = await ethers.getContract("Nft1")
   const name = (await nft1.name()).toString()
   const {deployer,user1}=await getNamedAccounts()
   const mintNft=await nft1.mintNFT(user1,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
  // let intA=parseInt(name);
    console.log("name =",mintNft)
}

mint_nft1()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })