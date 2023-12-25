const { ethers } = require("hardhat")

async function getNft1s() {
    const nft1 = await ethers.getContractAt("nft1","0x95142498886E95939aFefe44461dcEfcCdeee684")
   const name = (await nft1.name()).toString()
  // let intA=parseInt(name);
    console.log("name =",name)
}

getNft1s()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })