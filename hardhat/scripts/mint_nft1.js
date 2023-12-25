const { ethers, getNamedAccounts } = require("hardhat")

async function mint_nft1() {
    const nft1 = await ethers.getContractAt("nft1","0x95142498886E95939aFefe44461dcEfcCdeee684")
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