const { getNamedAccounts, ethers, deployments } = require("hardhat");

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
    
    
    await nft1.mintNFT(user2,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
    await nft1.mintNFT(user2,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
    await nft1.mintNFT(user2,"https://turquoise-absent-octopus-377.mypinata.cloud/ipfs/QmWT7Eqt1Gsns8B9ZUZ3gkYUBcmWer89i9PzvVZY7W6wVq")
    console.log("balance of user2",await nft1.balanceOf(user2))
console.log("owner of usertokenId",await nft1.ownerOf(1))
console.log("owner of usertokenId",await nft1.ownerOf(2))
console.log("owner of usertokenId",await nft1.ownerOf(3))
 let ans=await SmartAccountDeployer.createAndAddSmartAccount(user2,ContractMapper.target);
            //console.log(ans)
             let ans2=await ContractMapper.getSmartAccount(user2);
            console.log("smart acc of user2=",ans2);


            let nft2=nft1.connect(accounts[2])
            console.log("user2 adress =",user2 )
            
const transfernfttoWallet=await nft2.safeTransferFrom(user2,ans2 , 1)
await nft2.safeTransferFrom(user2,ans2 , 2)
await nft2.safeTransferFrom(user2,ans2 , 3)
             //console.log(transfernfttoWallet)
             console.log("owner of usertokenId",await nft1.ownerOf(1))
             console.log("owner of usertokenId",await nft1.ownerOf(2))
             console.log("owner of usertokenId",await nft1.ownerOf(3))

             let smartWallet=await ethers.getContractAt("SmartWallet",ans2)
             
             let user2Wallet=smartWallet.connect(accounts[2]);
             console.log(user2Wallet)

             let ans3=await user2Wallet.adderc721Contract(nft1.target,1)
             await user2Wallet.adderc721Contract(nft1.target,2)
             await user2Wallet.adderc721Contract(nft1.target,3)
             ans3=await ans3.wait();
             let ans4=await user2Wallet.iserc721TokenOwner(nft1.target)
             console.log(ans4) 

             let contract=new ethers.Contract(nft2.target,["function transferFrom(address,address,uint256)"])
            let tx=await contract.transferFrom.populateTransaction(user2Wallet.target,deployer,1);
            console.log(tx.data)
              let ans5=await user2Wallet.erc721Caller(nft1.target,tx.data)
             ans5=await ans5.wait(); 
             console.log(ans5)
             let updateErc721=await user2Wallet.updateerc721Contract(nft2.target,1)
             console.log(updateErc721)
             let ans6=await user2Wallet.iserc721TokenOwner(nft1.target)
             console.log(ans6)

             let tx2=await contract.transferFrom.populateTransaction(user2Wallet.target,deployer,2);
            console.log(tx.data)
              await user2Wallet.erc721Caller(nft1.target,tx2.data)
             
          await user2Wallet.updateerc721Contract(nft2.target,2)
             
             console.log(await user2Wallet.iserc721TokenOwner(nft1.target))

             let tx3=await contract.transferFrom.populateTransaction(user2Wallet.target,deployer,3);
           
             await user2Wallet.erc721Caller(nft1.target,tx3.data)
            
             await user2Wallet.updateerc721Contract(nft2.target,3)
             
         
             console.log(await user2Wallet.iserc721TokenOwner(nft1.target))
             
 
}

write_function()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })