
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployGatekeeperTwo: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('GatekeeperTwo', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('GatekeeperTwo',deploymentResult)
  
};

export default deployGatekeeperTwo;
deployGatekeeperTwo.tags = ['GatekeeperTwo'];

