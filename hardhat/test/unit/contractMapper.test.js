const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");
const { describe, beforeEach, it } = require("mocha");
const {anyValue }=require("@nomicfoundation/hardhat-chai-matchers/withArgs")
async function deployContractMapper() {
    const {deploy,log}=deployments;
    const {deployer,user1}=await getNamedAccounts();
    
    const SmartAccountDeployer=await deploy("SmartAccountDeployer",{
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
    
  
    
  } 

describe("contractMapper",function(){
    let ContractMapper1,deployer1,_user1,SmartAccountDeployer1;

    beforeEach(async ()=>{
        const {deployer,user1}=await getNamedAccounts();
      
        deployer1=deployer;
        _user1=user1;
        await loadFixture(deployContractMapper);
        const _sad=await ethers.getContract("SmartAccountDeployer");
        SmartAccountDeployer1=_sad;
        const _cm=await ethers.getContract("ContractMapper");
        ContractMapper1=_cm;
        
    })
    describe("constructor",function(){
        it("checks the address",async()=>{
            expect(ContractMapper1.target).to.be.equal("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
        })
        it("checks the owner of the contract",async ()=>{
            let owner=await ContractMapper1.owner()
            expect(owner).to.be.equal(SmartAccountDeployer1.target)

        })

    })
    describe("get smart Account function",function () {
        beforeEach(async()=>{
            console.log("user ",_user1)
            
             let ans=await SmartAccountDeployer1.createAndAddSmartAccount(_user1,ContractMapper1.target);
            console.log(ans)
            let ans2=await ContractMapper1.getSmartAccount(_user1);
            console.log(ans2);  
        
        })
         it("it should return user Acc",async()=>{
            let ans2 =await expect(await ContractMapper1.getSmartAccount(_user1)).not.to.be.equal("0x0000000000000000000000000000000000000000");
            console.log("user contract address=",ans2);
        }) 
    })

})