const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");
const { describe, beforeEach, it } = require("mocha");
const {anyValue }=require("@nomicfoundation/hardhat-chai-matchers/withArgs")
async function deploySmartAccountDeployer() {
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();

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
    
  } 

describe("SmartAccountDeployer",function(){
    let deployer1,SmartAccountDeployer1,ContractMapper1;

    beforeEach(async ()=>{
        const {deployer}=await getNamedAccounts();
        deployer1=deployer;
        await loadFixture(deploySmartAccountDeployer);
        const _sad=await ethers.getContract("SmartAccountDeployer",deployer);
        SmartAccountDeployer1=_sad;
        const _cm=await ethers.getContract("ContractMapper",deployer);
        ContractMapper1=_cm;
        
    })
    describe("constructor",function(){
        it("checks the address",async()=>{
            expect(SmartAccountDeployer1.target).to.be.equal("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
        })
        it("checks the owner of the contract",async ()=>{
            let owner=await SmartAccountDeployer1.owner()
            expect(owner).to.be.equal(deployer1)

        })

    })
    describe("function createAndAddSmartAccount",async()=>{
        
        it("add a new user and account",async ()=>{
            const {deployer,user1}=await getNamedAccounts()
            let accounts=await ethers.getSigners();
            console.log(accounts[2].address)
            console.log("contract mapper=",ContractMapper1.target)
            
                  let ans=await SmartAccountDeployer1.createAndAddSmartAccount(user1,ContractMapper1.target);
                 console.log(ans)
                 let ans2=await ContractMapper1.getSmartAccount(user1);
                 console.log(ans2); 
                 let ans3=await expect(await SmartAccountDeployer1.createAndAddSmartAccount(accounts[2].address,ContractMapper1.target)).to.emit(SmartAccountDeployer1,"NewAccount")
                 console.log(ans3)
                 
                 let ans4=await expect(await SmartAccountDeployer1.createAndAddSmartAccount(accounts[3].address,ContractMapper1.target)).to.emit(ContractMapper1,"Log")
                 console.log(ans3)
                 
            
            
        })
        /* it("should not emit new Acc",async ()=>{
            const {deployer,user1}=await getNamedAccounts()
            let accounts=await ethers.getSigners();
            console.log(accounts[2].address)
            console.log("contract mapper=",ContractMapper1.target)
            
                   
                 let ans3=await expect(await SmartAccountDeployer1.createAndAddSmartAccount(accounts[2].address,ContractMapper1.target)).not.to.be.emit(SmartAccountDeployer1,"NewAccount")
                 console.log(ans3)
                 
            
            
        }) */

    })

})