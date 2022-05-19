
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const deployReentrancyAttack: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {exploiter} = await getNamedAccounts();
    const reentrance= await deployments.get("Reentrance")
    
    const deploymentResult=await deploy('ReentrancyAttack', {
        from: exploiter,
        args: [reentrance.address],
        log: true,
    });

    showDeploymentAddress('ReentrancyAttack',deploymentResult)
};

export default deployReentrancyAttack;
deployReentrancyAttack.tags = ['ReentrancyAttack'];
deployReentrancyAttack.dependencies=["Reentrance"]

