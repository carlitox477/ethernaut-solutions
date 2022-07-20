
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const deployDexTwo: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const deploymentResult=await deploy('DexTwo', {
        from: deployer,
        args: [],
        log: true,
    });

    showDeploymentAddress('DexTwo',deploymentResult)
};

export default deployDexTwo;
deployDexTwo.tags = ['DexTwo'];

