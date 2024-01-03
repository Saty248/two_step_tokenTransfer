const { getNamedAccounts, ethers, deployments } = require("hardhat");

/* async function deploySmartAccountDeployer() {
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    let accounts=await ethers.getSigners();
    let user2=accounts[2].address;
    const nft=await deploy("Nft1",{
        from:deployer,
        args:[],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    
    const nft1=await ethers.getContract("Nft1");
    let MINT_NFT=await nft1.mintNFT(user2,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
  
   const SmartAccountDeployer= await deploy("SmartAccountDeployer",{
        from:deployer,
        args:[],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,
        
    })
    let SmartAccountDeployerAddress=SmartAccountDeployer.address;
    await deploy("ContractMapper",{
        from:deployer,
        args:[SmartAccountDeployerAddress],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    return user2;
    
  }
 */
async function write_function() {
    let accounts=await ethers.getSigners();
    let user2=accounts[2].address;
    let nft1=await ethers.getContract("Nft1");
    
    const SmartAccountDeployer=await ethers.getContract("SmartAccountDeployer"); 
    const ContractMapper = await ethers.getContract("ContractMapper")
    

    const {deployer}=await getNamedAccounts()
    const owner = (await nft1.owner()).toString()
    const _user2Balance = (await nft1.balanceOf(user2))
    console.log("balance of user2",await nft1.balanceOf(user2))
    
    if(parseInt(_user2Balance)<=0){
    await nft1.mintNFT(user2,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
    
}
console.log("owner of usertokenId",await nft1.ownerOf(1))
let ans=await SmartAccountDeployer.createAndAddSmartAccount(user2,ContractMapper.target);
            console.log(ans)
             let ans2=await ContractMapper.getSmartAccount(user2);
            console.log("smart acc of user2=",ans2);


            let nft2=nft1.connect(accounts[2])
            console.log("user2 adress =",user2 )
            
const transfernfttoWallet=await nft2.safeTransferFrom(user2,ans2 , 1)
             console.log(transfernfttoWallet)
             console.log("owner of usertokenId",await nft1.ownerOf(1))

             let smartWallet=await ethers.getContractAt("SmartWallet",ans2)
             
             let user2Wallet=smartWallet.connect(accounts[2]);
             console.log(user2Wallet)

             let ans3=await user2Wallet.adderc721Contract(nft1.target,1)
             ans3=await ans3.wait();
             let ans4=await user2Wallet.iserc721TokenOwner(nft1.target)
             console.log(ans4) 

             let contract=new ethers.Contract(nft2.target,["function transferFrom(address,address,uint256)"])
            let tx=await contract.transferFrom.populateTransaction(user2Wallet.target,deployer,1);
            console.log(tx.data)
              let ans5=await user2Wallet.erc721Caller(nft1.target,tx.data)
             ans5=await ans5.wait(); 
             console.log(ans5)
}

write_function()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })