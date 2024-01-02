const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");
const { describe, beforeEach, it } = require("mocha");
const {anyValue }=require("@nomicfoundation/hardhat-chai-matchers/withArgs")
async function deploySmartAccountDeployer() {
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

describe("Smart wallet",async function(){
    let deployer1,SmartAccountDeployer1,ContractMapper1,_user2;
    

    beforeEach(async ()=>{
        const {deployer}=await getNamedAccounts();
        deployer1=deployer;
        let user2=await loadFixture(deploySmartAccountDeployer);
        _user2=user2;
        const _sad=await ethers.getContract("SmartAccountDeployer",deployer);
        SmartAccountDeployer1=_sad;
        const _cm=await ethers.getContract("ContractMapper",deployer);
        ContractMapper1=_cm;

        
    })
     describe("constructor",function(){
         /* it("checks if the wallet can recieve the token",async()=>{
            let ans=await SmartAccountDeployer1.createAndAddSmartAccount(_user2,ContractMapper1.target);
            console.log(ans)
            let ans2=await ContractMapper1.getSmartAccount(_user2);
            console.log(ans2); 
            let nft1 = await ethers.getContract("Nft1",_user2)
            
                const _user2Balance = (await nft1.balanceOf(_user2)).toString()
                console.log("balance of",_user2Balance)
                
                const transfernfttoWallet=await nft1.safeTransferFrom(_user2,ans2 , 1)
             console.log(transfernfttoWallet)
             console.log(await nft1.ownerOf(1))
             
            
        })  */
              it("adds token address",async()=>{
            let nft1 = await ethers.getContract("Nft1",_user2)

            let ans=await ContractMapper1.getSmartAccount(_user2);
            console.log(ans);
            let smartWallet=await ethers.getContractAt("SmartWallet",ans)
            let accounts=await ethers.getSigners();
            let user2Wallet=smartWallet.connect(accounts[2]);
            console.log(user2Wallet)
             let ans3=await user2Wallet.adderc721Contract(nft1.target,1)
             ans3=await ans3.wait();
             let ans4=await user2Wallet.iserc721TokenOwner(nft1.target)
             console.log(ans4) 
            
        })  
        
        /* it("call a read func on nft",async ()=>{
            let nft1 = await ethers.getContract("Nft1",_user2)

            let ans=await ContractMapper1.getSmartAccount(_user2);
            console.log(ans);
            let smartWallet=await ethers.getContractAt("SmartWallet",ans)
            let accounts=await ethers.getSigners();
            let user2Wallet=smartWallet.connect(accounts[2]);
            console.log(user2Wallet)
            let func="ownerOf(uint256)";
            let parameters=[1];
            let contract=new ethers.Contract(nft1.target,["function transferFrom(address,address,uint256)"])
            let tx=await contract.transferFrom.populateTransaction(user2Wallet.target,deployer1,1);
            console.log(tx.data)
              let ans3=await user2Wallet.erc721Caller(nft1.target,tx.data)
             ans3=await ans3.wait(); 
             console.log(ans3)
             
            
        })  
        it("balance of new owner",async()=>{
            let nft1 = await ethers.getContract("Nft1",deployer1);
            let ans=await nft1.ownerOf(1);
            console.log(deployer1)
            console.log(ans);
        }) */
       
 
    })
   

})