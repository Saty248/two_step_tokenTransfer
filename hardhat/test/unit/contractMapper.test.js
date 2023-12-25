const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { getNamedAccounts, ethers, deployments } = require("hardhat");
const { describe, beforeEach, it } = require("mocha");

async function deployContractMapper() {
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();

    const SmartAccountDeployer=await deploy("SmartAccountDeployer",{
        from:deployer,
        args:[],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,
        
    })
    let SmartAccountDeployerAddress=SmartAccountDeployer.address;
    const ContractMapper = await deploy("ContractMapper",{
        from:deployer,
        args:[SmartAccountDeployerAddress],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    
  
    return {SmartAccountDeployer,ContractMapper};
  } 

describe("contractMapper",function(){
    let ContractMapper1,deployer1,SmartAccountDeployer1;

    beforeEach(async ()=>{
        const {deployer}=await getNamedAccounts();
        deployer1=deployer;
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

})