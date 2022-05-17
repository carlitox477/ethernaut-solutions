
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployForce: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('Force', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('Force',deploymentResult)
  
};

export default deployForce;
deployForce.tags = ['Force'];

