
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const deploySwappableTokenTwo: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const dexDeployment= await deployments.get("DexTwo")
    const dexTwo = await ethers.getContractAt("DexTwo",dexDeployment.address)
    
    const deploymentResultA=await deploy('Swappable Token Two A', {
        from: deployer,
        args: [dexTwo.address,"Token A","STA",ethers.BigNumber.from(`1000`)],
        log: true,
        contract:"SwappableTokenTwo"
    });

    const deploymentResultB=await deploy('Swappable Token Two B', {
        from: deployer,
        args: [dexTwo.address,"Token B","STB",ethers.BigNumber.from(`1000`)],
        log: true,
        contract:"SwappableTokenTwo"
    });

    showDeploymentAddress('SwappableTokenTwo A',deploymentResultA)
    showDeploymentAddress('SwappableTokenTwo B',deploymentResultB)
};

export default deploySwappableTokenTwo;
deploySwappableTokenTwo.tags = ['SwappableTokenTwo'];
deploySwappableTokenTwo.dependencies=['DexTwo']

