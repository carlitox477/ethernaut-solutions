
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployTelephone: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('Telephone', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('Telephone',deploymentResult)
  
};

export default deployTelephone;
deployTelephone.tags = ['Telephone'];

