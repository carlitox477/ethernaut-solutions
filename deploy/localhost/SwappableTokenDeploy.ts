
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const deploySwappableToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const dexDeployment= await deployments.get("Dex")
    const dex = await ethers.getContractAt("Dex",dexDeployment.address)
    
    const deploymentResultA=await deploy('Swappable Token A', {
        from: deployer,
        args: [dex.address,"Token A","STA",ethers.BigNumber.from(`1000${"0".repeat(18)}`)],
        log: true,
        contract:"SwappableToken"
    });

    const deploymentResultB=await deploy('Swappable Token B', {
        from: deployer,
        args: [dex.address,"Token B","STB",ethers.BigNumber.from(`1000${"0".repeat(18)}`)],
        log: true,
        contract:"SwappableToken"
    });

    showDeploymentAddress('SwappableToken A',deploymentResultA)
    showDeploymentAddress('SwappableToken B',deploymentResultB)
};

export default deploySwappableToken;
deploySwappableToken.tags = ['SwappableToken'];
deploySwappableToken.dependencies=['Dex']

