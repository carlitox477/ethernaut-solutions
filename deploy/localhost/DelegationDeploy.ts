
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const deployDelegation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const delegate= await deployments.get("Delegate")
    
    const deploymentResult=await deploy('Delegation', {
        from: deployer,
        args: [delegate.address],
        log: true,
    });

    showDeploymentAddress('Delegation',deploymentResult)
};

export default deployDelegation;
deployDelegation.tags = ['Delegation'];
deployDelegation.dependencies=["Delegate"]

