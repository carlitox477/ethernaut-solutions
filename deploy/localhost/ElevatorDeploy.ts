
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const deployElevator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const deploymentResult=await deploy('Elevator', {
        from: deployer,
        args: [],
        log: true,
    });

    showDeploymentAddress('Elevator',deploymentResult)
};

export default deployElevator;
deployElevator.tags = ['Elevator'];

