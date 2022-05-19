
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployReentrance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('Reentrance', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('Reentrance',deploymentResult)
  
};

export default deployReentrance;
deployReentrance.tags = ['Reentrance'];

