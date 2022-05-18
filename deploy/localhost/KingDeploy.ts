
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployKing: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('King', {
    from: deployer,
    args: [],
    value: "1",
    log: true,
  });

  showDeploymentAddress('King',deploymentResult)
  
};

export default deployKing;
deployKing.tags = ['King'];

