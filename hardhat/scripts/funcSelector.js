const { ethers ,getNamedAccounts} = require("hardhat")

async function getNft1s() {
    const FuncSelc = await ethers.getContractAt("FuncSelc","0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
    const test1 = await ethers.getContractAt("Test1","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
    const {deployer,user1}=await getNamedAccounts()
    const owner = (await FuncSelc.callGetter("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"))
    /*  let ans=ethers.AbiCoder.defaultAbiCoder();
    let ans2=ans.decode(["uint256"],owner);  */
  // let intA=parseInt(name);
    console.log("name =",owner)
    console.log("val=",await test1.getter())
}

getNft1s()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })