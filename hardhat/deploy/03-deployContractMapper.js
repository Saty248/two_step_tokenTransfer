const { network, ethers} = require("hardhat");

//const { developmentChains } = require("../helper-hardhat-config");

//const {verify}=require('../helper-functions')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const SmartAccountDeployer=await ethers.getContract("SmartAccountDeployer");
    let SmartAccountDeployerAddress=SmartAccountDeployer.target
    log(`loggin address of SmartAccount ${SmartAccountDeployerAddress}` )


    const ContractMapper=await deploy("ContractMapper",{
        from:deployer,
        args:[SmartAccountDeployerAddress],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    log(`CcontractMapper deployed at ${ContractMapper.address}`)
    /* if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
      ) {
        await verify(ourToken.address, [INITIAL_SUPPLY,"tokenA","T_A"])
      } */
}

module.exports.tags = ["all", "ContractMapper"]