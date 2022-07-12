
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployGatekeeperOne: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('GatekeeperOne', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('GatekeeperOne',deploymentResult)
  
};

export default deployGatekeeperOne;
deployGatekeeperOne.tags = ['GatekeeperOne'];

