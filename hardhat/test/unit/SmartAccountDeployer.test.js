const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");
const { describe, beforeEach, it } = require("mocha");

async function deploySmartAccountDeployer() {
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();

    await deploy("SmartAccountDeployer",{
        from:deployer,
        args:[],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,
        
    })
    
  } 

describe("SmartAccountDeployer",function(){
    let deployer1,SmartAccountDeployer1;

    beforeEach(async ()=>{
        const {deployer}=await getNamedAccounts();
        deployer1=deployer;
        await loadFixture(deploySmartAccountDeployer);
        const _sad=await ethers.getContract("SmartAccountDeployer");
        SmartAccountDeployer1=_sad;
        
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

})