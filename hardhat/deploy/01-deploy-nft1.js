const { network, getNamedAccounts, deployments } = require("hardhat");
//const { developmentChains } = require("../helper-hardhat-config");

//const {verify}=require('../helper-functions')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();

    const nft1=await deploy("Nft1",{
        from:deployer,
        args:[],
        log:true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    log(`nft1 deployed at ${nft1.address}`)
    /* if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
      ) {
        await verify(ourToken.address, [INITIAL_SUPPLY,"tokenA","T_A"])
      } */
}

module.exports.tags = ["all", "nft1"]
 