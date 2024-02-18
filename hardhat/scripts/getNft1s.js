const { ethers } = require("hardhat")

async function getNft1s() {
    const nft1 = await ethers.getContract("Nft1")
   const name = (await nft1.balanceOf("0x75537828f2ce51be7289709686A69CbFDbB714F1")).toString()
  // let intA=parseInt(name);
    console.log("name =",name)
}

getNft1s()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })